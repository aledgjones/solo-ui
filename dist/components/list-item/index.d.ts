import { FC, CSSProperties } from "react";
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
}
/**
 * List Item with default hover styles if onClick present.
 */
export declare const ListItem: FC<Props>;
export {};
