import { CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    percent?: number;
    color: string;
    hidden?: boolean;
}
/**
 * Progress component. Can be indeterminate or determinate to show working state or progres.
 */
export declare const Progress: FC<Props>;
export {};
