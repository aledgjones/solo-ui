import { MutableRefObject, Dispatch, SetStateAction } from "react";
export interface Item {
    key: string;
    index: number;
    active: boolean;
    sorting: boolean;
    offset: {
        x: number;
        y: number;
    };
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
