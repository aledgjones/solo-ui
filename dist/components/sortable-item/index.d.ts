import { MutableRefObject } from "react";
import { SuperFC } from "../../generic";
interface Props {
    index: number;
    handle?: MutableRefObject<HTMLDivElement | null>;
}
export declare const SortableItem: SuperFC<HTMLDivElement, Props>;
export {};
