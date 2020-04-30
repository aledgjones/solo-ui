import React, { FC, useRef, useCallback, useEffect } from 'react';

import './styles.css';
import { merge } from 'utils/merge';

interface Props {
    value: any;
}

/**
 * Tab component to be used inside the Tabs component;
 */
export const Tab: FC<Props> = ({ children }) => {
    return <>{children}</>;
}


interface PropsExtended extends Props {
    selected: boolean;
    highlight: string;
    color: string;
    onChange: (value: any) => void;
    setBar: (value: { left: number, width: number }) => void;
}

/**
 * Tab component to be used inside the Tabs component;
 */
export const TabExtended: FC<PropsExtended> = ({ children, value, selected, highlight, color, onChange, setBar }) => {

    const ref = useRef<HTMLDivElement>(null);

    const onClick = useCallback(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value, onChange]);

    useEffect(() => {
        if (setBar && selected && ref.current) {
            setBar({ left: ref.current.offsetLeft, width: ref.current.offsetWidth });
        }
    }, [selected, setBar, ref]);

    return <div
        ref={ref}
        className={merge("ui-tab", { 'ui-tab--selected': selected })}
        style={{
            color: selected ? highlight : color,
            transition: selected ? 'color .2s .1s' : 'color .2s'
        }}
        onClick={onClick}
    >{children}</div>;
}