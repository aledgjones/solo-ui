import React, { FC, CSSProperties } from 'react';
import { merge } from '../../utils/merge';
import { Card } from '../card';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    label: string;
}

export const MenuBarItem: FC<Props> = ({ children }) => {
    return <>{children}</>;
}

interface PropsExtended extends Props {
    selected: boolean;
    onSelect: (label: string) => void;
}

export const MenuBarItemExtended: FC<PropsExtended> = ({ id, className, style, selected, label, onSelect, children }) => {
    return <div
        id={id}
        className={merge('ui-menu-bar-item', { 'ui-menu-bar-item--selected': selected }, className)}
        style={style}
        onPointerEnter={() => onSelect(label)}
    >
        {label}
        {selected && <Card className="ui-menu-bar-item__card">
            {children}
        </Card>}
    </div>;
}