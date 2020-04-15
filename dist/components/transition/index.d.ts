import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    type: 'swipeUp' | 'fadeIn';
}
/**
 * Basic animation in for elements.
 */
export declare const Transition: FC<Props>;
export {};
