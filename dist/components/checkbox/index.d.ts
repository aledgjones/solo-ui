import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    value: boolean;
    color: string;
    margin?: boolean;
    disabled?: boolean;
    onChange: (value: boolean) => void;
}
/**
 * Chackbox component for boolean values.
 */
export declare const Checkbox: FC<Props>;
export {};
