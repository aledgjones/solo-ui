import { FC, CSSProperties } from "react";
import "./styles.css";
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    label: string;
}
export declare const MenuBarItem: FC<Props>;
export {};
