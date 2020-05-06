import React, { ComponentType } from "react";
import "./styles.css";
interface Props {
    width?: number;
    open: boolean;
}
/**
 * Dialog component for displaying related but long form actions.
 */
export declare function Dialog<T>(Content: ComponentType<T>): React.FC<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & Props & T>;
export {};
