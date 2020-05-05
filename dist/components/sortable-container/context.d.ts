import { MutableRefObject, Dispatch, SetStateAction } from "react";
export interface Item {
    key: string;
    index: number;
    sorting: boolean;
    active: boolean;
    ref: MutableRefObject<HTMLDivElement | null>;
}
export interface Items {
    [key: string]: Item;
}
declare type ItemsUpdater = Dispatch<SetStateAction<Items>>;
interface Context {
    config: {
        direction: "x" | "y";
        onEnd: (oldIndex: number, newIndex: number) => void;
    };
    items: Items;
    setItems: ItemsUpdater;
}
export declare const SortableContext: import("react").Context<Context>;
export {};
