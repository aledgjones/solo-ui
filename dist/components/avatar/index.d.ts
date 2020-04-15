import React, { FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    src?: string;
    name: string;
    size: number;
}
/**
 * Avatar component. Displays image else falls back to GMail style colored circle and letter.
 */
export declare const Avatar: FC<Props>;
export {};
