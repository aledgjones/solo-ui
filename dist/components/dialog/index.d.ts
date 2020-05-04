import { ReactNode } from "react";
import { SuperFC } from "../../generic";
import "./styles.css";
interface Props {
    width?: number;
    open: boolean;
    children: () => ReactNode;
}
/**
 * Dialog component for displaying related but long form actions.
 */
export declare const Dialog: SuperFC<Props>;
export {};
