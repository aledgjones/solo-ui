import { CSSProperties, FC } from 'react';
import '../input-base/styles.css';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    value: any;
    label: string;
    color: string;
    margin?: boolean;
    disabled?: boolean;
    direction?: 'up' | 'down';
    onChange: (value: any) => void;
}
/**
 * Select component to be used with the Option component.
 */
export declare const Select: FC<Props>;
export {};
