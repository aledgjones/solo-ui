import { MouseEvent, FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    path: string;
    size: number;
    color: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
/**
 * Icon which takes an svg path and renders.
 */
export declare const Icon: FC<Props>;
export {};
