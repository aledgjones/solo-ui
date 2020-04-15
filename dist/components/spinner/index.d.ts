import { CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    size: number;
    color: string;
    percent?: number;
}
/**
 * A spinner which can be indeterminate or determinate to denote working states or progress.
 */
export declare const Spinner: FC<Props>;
export {};
