import { MouseEvent, CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    color: string;
    compact?: boolean;
    outline?: boolean;
    disabled?: boolean;
    working?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
/**
 * Button component with optional outline-only styling.
 */
export declare const Button: FC<Props>;
export {};
