import { CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    value: boolean;
    disabled?: boolean;
    color: string;
    onChange?: (val: boolean) => void;
}
/**
 * Switch component.
 */
export declare const Switch: FC<Props>;
export {};
