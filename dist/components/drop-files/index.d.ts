import { CSSProperties, FC } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    accept?: string[];
    onDrop: (files: File[], discarded: number) => void;
}
/**
 * A dropzone component for dropping files into the UI
 */
export declare const DropFiles: FC<Props>;
export {};
