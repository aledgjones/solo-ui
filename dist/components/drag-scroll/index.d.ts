import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    x?: boolean;
    y?: boolean;
    ignore?: string;
    ignoreX?: string;
    ignoreY?: string;
}
export declare const DragScroll: FC<Props>;
export {};
