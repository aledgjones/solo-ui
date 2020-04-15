import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    shadow?: boolean;
}
/**
 * A basic top of screen app bar with dynamic shadow.
 */
export declare const Appbar: FC<Props>;
export {};
