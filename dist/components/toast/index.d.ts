import { FC } from 'react';
import { ToastInstance, ToastConfig } from './defs';
interface Props {
    color: string;
    toasts: ToastInstance[];
    onDestroy: (key: string) => void;
}
export declare const Toast: FC<Props>;
export declare function createToastInstance({ text, button, duration, onClick, onTimeout }: ToastConfig): ToastInstance;
export {};
