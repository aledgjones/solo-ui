import React, { FC, CSSProperties, Children, useState, useRef, useEffect } from 'react';
import { merge } from '../../utils/merge';

import { MenuBarItemExtended } from '../menu-bar-item';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const MenuBar: FC<Props> = ({ id, className, style, children }) => {

    // is the menu bar currently active?
    const [open, setOpen] = useState(false);
    // which item is currently selected
    const [selection, setSelection] = useState('');
    const element = useRef<HTMLDivElement>(null);

    // auto close
    useEffect(() => {
        const cb = (e: any) => {
            if (!element.current || !element.current.contains(e.target)) {
                setOpen(false);
            } else {
                setOpen(o => !o);
            }
        }
        document.addEventListener('click', cb);
        return () => document.removeEventListener('click', cb);
    }, [element]);

    return <div
        id={id}
        className={merge('ui-menu-bar', className)}
        style={style}
    >
        <div ref={element} className="ui-menu-bar__content">
            {Children.map(children, (child: any) => {
                return <MenuBarItemExtended {...child.props} selected={open && child.props.label === selection} onSelect={setSelection} />
            })}
        </div>
    </div>;
}