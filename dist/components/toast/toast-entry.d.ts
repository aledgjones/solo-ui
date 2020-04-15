import { FC } from 'react';
import { ToastInstance } from './defs';
import './styles.css';
interface Props {
    color: string;
    toast: ToastInstance;
    onDestroy: (key: string) => void;
}
/**
 * Internal component used by the Toast component.
 */
export declare const ToastEntry: FC<Props>;
export {};
