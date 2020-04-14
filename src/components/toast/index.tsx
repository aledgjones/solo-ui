import React, { FC, Fragment } from 'react';
import shortid from "shortid";

import { ToastInstance, ToastConfig } from './defs';
import { ToastEntry } from './toast-entry';

interface Props {
    color: string;
    toasts: ToastInstance[];
    onDestroy: (key: string) => void;
}

export const Toast: FC<Props> = ({ color, toasts, onDestroy }) => {
    return <Fragment>
        {toasts.map(toast => {
            return <ToastEntry key={toast.key} color={color} toast={toast} onDestroy={onDestroy} />;
        })}
    </Fragment>;
}

export function createToastInstance({ text, button, duration = 4000, onClick, onTimeout }: ToastConfig): ToastInstance {
    return {
        key: shortid(),
        text,
        button,
        duration,
        onClick,
        onTimeout
    }
}