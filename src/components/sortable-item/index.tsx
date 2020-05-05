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

export const SortableItem: SuperFC<Props> = ({ index, handle, className, onPointerDown, children, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    // set a fixed key for the duration of the items life
    const key = useMemo(() => shortid(), []);
    const { config, items, setItems } = useContext(SortableContext);

    // if exists, the index has changed so update else register with the container
    useEffect(() => {
        setItems(items => {
            const item = items[key];
            if (item) {
                // clear any offsets if the index has changed
                item.ref.current?.style.removeProperty("display");
                // update the index in the context for use later
                return {
                    ...items,
                    [key]: { ...item, index, ref }
                };
            } else {
                // on creation
                return {
                    ...items,
                    [key]: { key, index, ref }
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

    const onDown = useDragHandler<{ x: number; y: number; offsetItemsBy: number; moveTo: number }>(
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

                Object.entries(items).forEach(([itemKey, item]) => {
                    if (itemKey === key) {
                        item.ref.current?.classList.add("ui-sortable-item--active");
                    }
                    item.ref.current?.classList.add("ui-sortable-item--sorting");
                });

                // init mouse/pointer position
                return {
                    x: e.screenX,
                    y: e.screenY,
                    offsetItemsBy:
                        config.direction === "x" ? getAbsoluteWidth(ref.current) : getAbsoluteHeight(ref.current),
                    moveTo: index
                };
            },
            onMove: (e, init) => {
                if (config.direction === "x") {
                    init.moveTo = getInsertPointX(e, Object.values(items), index);
                    Object.entries(items).forEach(([itemKey, item]) => {
                        item.ref.current?.style.setProperty(
                            "transform",
                            `translate3d(${
                                itemKey === key
                                    ? e.screenX - init.x
                                    : getOffset(item, init.moveTo, index, init.offsetItemsBy)
                            }px, 0px, 0px)`
                        );
                    });
                } else {
                    init.moveTo = getInsertPointY(e, Object.values(items), index);
                    Object.entries(items).forEach(([itemKey, item]) => {
                        item.ref.current?.style.setProperty(
                            "transform",
                            `translate3d(0px, ${
                                itemKey === key
                                    ? e.screenY - init.y
                                    : getOffset(item, init.moveTo, index, init.offsetItemsBy)
                            }px, 0px)`
                        );
                    });
                }
            },
            onEnd: (_e, init) => {
                config.onEnd(index, init.moveTo);
                Object.entries(items).forEach(([itemKey, item]) => {
                    if (itemKey === key) {
                        item.ref.current?.style.setProperty("display", `none`);
                    }
                    item.ref.current?.style.setProperty("transform", `translate3d(0px, 0px, 0px)`);
                    item.ref.current?.classList.remove("ui-sortable-item--active");
                    item.ref.current?.classList.remove("ui-sortable-item--sorting");
                });
            }
        },
        [key, config, items, index, handle, onPointerDown]
    );

    return (
        <div ref={ref} onPointerDown={onDown} className={merge("ui-sortable-item", className)} {...props}>
            {children}
        </div>
    );
};
