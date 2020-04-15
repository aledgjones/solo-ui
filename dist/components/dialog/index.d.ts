import { FC, CSSProperties, ReactNode } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    width?: number;
    open: boolean;
    children: () => ReactNode;
}
/**
 * Dialog component for displaying related but long form actions.
 */
export declare const Dialog: FC<Props>;
export {};
