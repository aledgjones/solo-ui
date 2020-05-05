import React, { useRef, useEffect, useContext, MutableRefObject, useMemo } from "react";
import shortid from "shortid";

import { SortableContext, Items } from "../sortable-container/context";
import { useDragHandler } from "../../hooks/use-drag-handler";
import { merge } from "../../utils/merge";
import { SuperFC } from "../../generic";
import { getAbsoluteHeight } from "./get-absolute-height";
import { getAbsoluteWidth } from "./get-absolute-width";
import { getInsertPointX } from "./get-insert-point-x";
import { getInsertPointY } from "./get-insert-point-y";
import { getOffset } from "./get-offset";

interface Props {
    index: number;
    handle?: MutableRefObject<HTMLDivElement | null>;
}

export const SortableItem: SuperFC<Props> = ({
    index,
    handle,
    className,
    style,
    onPointerDown,
    children,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // set a fixed key for the duration of the items life
    const key = useMemo(() => shortid(), []);
    const { config, items, setItems } = useContext(SortableContext);
    const item = items[key];

    // if exists, the index has changed so update else register with the container
    useEffect(() => {
        setItems(items => {
            const item = items[key];
            if (item) {
                // if the item exits but we are updating the index...
                return {
                    ...items,
                    [key]: { ...item, index, ref }
                };
            } else {
                // on creation
                return {
                    ...items,
                    [key]: { key, index, sorting: false, active: false, offset: { x: 0, y: 0 }, ref }
                };
            }
        });
    }, [key, index, ref, setItems]);

    // cleanup on item destroyed
    useEffect(() => {
        return () => {
            setItems(items => {
                const { [key]: item, ...others } = items;
                return others;
            });
        };
    }, [key]);

    // stop native touch scrolling in the config.direction
    useEffect(() => {
        const target = handle && handle.current ? handle.current : ref.current;
        if (target) {
            target.style.touchAction = `pan-${config.direction === "x" ? "y" : "x"}`;
        }
    }, [handle, ref, config]);

    const onDown = useDragHandler<{ x: number; y: number; moveTo: number }>(
        {
            onDown: e => {
                if (onPointerDown) {
                    onPointerDown(e as any);
                }

                // cancel if not the left mouse button
                if (e.button === 2) {
                    return false;
                }

                // cancel any pointerdown events not inside the handle
                if (handle && handle.current) {
                    const target = e.target as HTMLDivElement;
                    if (handle.current !== e.target && !handle.current.contains(target)) {
                        return false;
                    }
                }

                setItems(items => {
                    return Object.entries(items).reduce<Items>((output, [itemKey, item]) => {
                        return {
                            ...output,
                            [itemKey]: {
                                ...item,
                                active: itemKey === key,
                                sorting: true
                            }
                        };
                    }, {});
                });

                // init mouse/pointer position
                return {
                    x: e.screenX,
                    y: e.screenY,
                    moveTo: index
                };
            },
            onMove: (e, init) => {
                setItems(items => {
                    if (config.direction === "x") {
                        const offsetItemsBy = getAbsoluteWidth(ref.current);
                        init.moveTo = getInsertPointX(e, Object.values(items), index);
                        return Object.entries(items).reduce<Items>((output, [itemKey, item]) => {
                            return {
                                ...output,
                                [itemKey]: {
                                    ...item,
                                    offset: {
                                        x:
                                            itemKey === key
                                                ? e.screenX - init.x
                                                : getOffset(item, init.moveTo, index, offsetItemsBy),
                                        y: 0
                                    }
                                }
                            };
                        }, {});
                    } else {
                        const offsetItemsBy = getAbsoluteHeight(ref.current);
                        init.moveTo = getInsertPointY(e, Object.values(items), index);
                        return Object.entries(items).reduce<Items>((output, [itemKey, item]) => {
                            return {
                                ...output,
                                [itemKey]: {
                                    ...item,
                                    offset: {
                                        x: 0,
                                        y:
                                            itemKey === key
                                                ? e.screenY - init.y
                                                : getOffset(item, init.moveTo, index, offsetItemsBy)
                                    }
                                }
                            };
                        }, {});
                    }
                });
            },
            onEnd: (_e, init) => {
                config.onEnd(index, init.moveTo);
                setItems(items => {
                    return Object.entries(items).reduce<Items>((output, [itemKey, item]) => {
                        return {
                            ...output,
                            [itemKey]: {
                                ...item,
                                active: false,
                                sorting: false,
                                offset: {
                                    x: 0,
                                    y: 0
                                }
                            }
                        };
                    }, {});
                });
            }
        },
        [key, config, items, index, handle, onPointerDown]
    );

    return (
        <div
            ref={ref}
            style={{
                transform: `translate(${item?.offset.x || 0}px,${item?.offset.y || 0}px)`,
                ...style
            }}
            onPointerDown={onDown}
            className={merge(
                "ui-sortable-item",
                {
                    "ui-sortable-item--active": item?.active || false,
                    "ui-sortable-item--sorting": item?.sorting || false
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
