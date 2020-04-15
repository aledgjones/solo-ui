import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    width: number;
}
/**
 * Section component.
 */
export declare const Section: FC<Props>;
export {};
