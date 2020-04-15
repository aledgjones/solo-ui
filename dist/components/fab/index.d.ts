import { CSSProperties, MouseEvent, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    path: string;
    color: string;
    text: string;
    compact?: boolean;
    hidden?: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
/**
 * Floating action button (FAB)
 */
export declare const Fab: FC<Props>;
export {};
