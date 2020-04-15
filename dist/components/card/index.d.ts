import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    margin?: boolean;
    animate?: boolean;
}
/**
 * Generic card component.
 */
export declare const Card: FC<Props>;
export {};
