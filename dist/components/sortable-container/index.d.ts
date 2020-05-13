import { SuperFC } from "generic";
interface Props {
    direction: "x" | "y";
    onEnd: (oldIndex: number, newIndex: number) => void;
}
export declare const SortableContainer: SuperFC<HTMLDivElement, Props>;
export {};
