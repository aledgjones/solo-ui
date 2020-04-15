import { CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    compact?: boolean;
}
/**
 * Simple devider component.
 */
export declare const Divider: FC<Props>;
export {};
