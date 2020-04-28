import React, { FC, CSSProperties, Children, useState } from 'react';
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
    const [active, setActive] = useState(false);
    // which item is currently selected
    const [selection, setSelection] = useState('');

    return <div
        id={id}
        className={merge('ui-menu-bar', className)}
        style={style}
        onClick={() => setActive(o => !o)}
    >
        {Children.map(children, (child: any) => {
            return <MenuBarItemExtended {...child.props} selected={active && child.props.label === selection} onSelect={setSelection} />
        })}
    </div>;
}