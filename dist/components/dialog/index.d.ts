import { FC, CSSProperties } from "react";
import "./styles.css";
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    width?: number;
    open: boolean;
}
/**
 * Dialog component for displaying related but long form actions/information.
 */
export declare function Dialog<T>(Content: any): FC<T & Props>;
export {};
