import { CSSProperties, FC, ReactNode } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    width: number;
    open: boolean;
    onClose: () => void;
    children: () => ReactNode;
}
/**
 * App drawer component.
 */
export declare const Drawer: FC<Props>;
export {};
