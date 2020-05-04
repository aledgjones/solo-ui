import React, { useRef, useEffect, useContext, MutableRefObject, useMemo } from "react";
import shortid from "shortid";

import { SortableContext } from "../sortable-container/context";
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
    const key = useMemo(() => shortid(), []);
    const ref = useRef<HTMLDivElement>(null);
    const { config, items, setItems } = useContext(SortableContext);

    const item = items.find(item => item.key === key);

    // register the dom element ref with the container.
    useEffect(() => {
        setItems(s => [...s, { key, index, sorting: false, active: false, offset: { x: 0, y: 0 }, ref }]);
        return () => {
            setItems(s => s.filter(item => item.key !== key));
        };
    }, [key, index, ref, setItems]);

    // stop native touch scrolling in the config.direction
    useEffect(() => {
        const target = handle && handle.current ? handle.current : ref.current;
        if (target) {
            target.style.touchAction = `pan-${config.direction === "x" ? "y" : "x"}`;
        }
    }, [handle, ref, config]);

    const onDown = useDragHandler<{ x: number; y: number; insertAt: number }>(
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
                    return items.map(item => {
                        return { ...item, active: item.key === key, sorting: true };
                    });
                });

                // init mouse/pointer position
                return {
                    x: e.screenX,
                    y: e.screenY,
                    insertAt: index
                };
            },
            onMove: (e, init) => {
                setItems(items => {
                    if (config.direction === "x") {
                        const offsetItemsBy = getAbsoluteWidth(ref.current);
                        init.insertAt = getInsertPointX(e, items, index);
                        return items.map(item => {
                            if (item.key === key) {
                                // if selected offset by pointer delta
                                return { ...item, offset: { x: e.screenX - init.x, y: 0 } };
                            } else {
                                // else offset by selection height
                                return {
                                    ...item,
                                    offset: {
                                        x: getOffset(item, init.insertAt, index, offsetItemsBy),
                                        y: 0
                                    }
                                };
                            }
                        });
                    } else {
                        const offsetItemsBy = getAbsoluteHeight(ref.current);
                        init.insertAt = getInsertPointY(e, items, index);
                        return items.map(item => {
                            if (item.key === key) {
                                // if selected offset by pointer delta
                                return { ...item, offset: { y: e.screenY - init.y, x: 0 } };
                            } else {
                                // else offset by selection height
                                return {
                                    ...item,
                                    offset: {
                                        y: getOffset(item, init.insertAt, index, offsetItemsBy),
                                        x: 0
                                    }
                                };
                            }
                        });
                    }
                });
            },
            onEnd: (_e, init) => {
                config.onEnd(index, init.insertAt);
                setItems(items => {
                    return items.map(item => {
                        return { ...item, sorting: false, active: false, offset: { x: 0, y: 0 } };
                    });
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
