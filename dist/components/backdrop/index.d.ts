import React, { CSSProperties } from "react";
import "./styles.css";
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    open: boolean;
    transparent?: boolean;
    onClick?: () => void;
}
/**
 * Backdrop component used for overlays (dialogs, sheets etc.)
 */
export declare const Backdrop: React.FC<Props>;
export {};
