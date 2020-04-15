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
 * Bottom Sheet component for displaying contexual actions.
 */
export declare const BottomSheet: FC<Props>;
export {};
