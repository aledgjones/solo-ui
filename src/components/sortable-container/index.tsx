import React, { useState } from "react";

import { SortableContext, Item } from "./context";
import { merge } from "../../utils/merge";
import { SuperFC } from "generic";

interface Props {
    direction: "x" | "y";
    onEnd: (oldIndex: number, newIndex: number) => void;
}

export const SortableContainer: SuperFC<Props> = ({ className, direction, onEnd, children, ...props }) => {
    const [items, setItems] = useState<Item[]>([]);

    return (
        <SortableContext.Provider value={{ config: { direction, onEnd }, items, setItems }}>
            <div className={merge("ui-sortable-container", className)} {...props}>
                {children}
            </div>
        </SortableContext.Provider>
    );
};
