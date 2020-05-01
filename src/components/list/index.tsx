import React, { FC, CSSProperties } from 'react';
import { merge } from '../../utils/merge';
import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    onClick?: () => void;
}

export const List: FC<Props> = ({ id, className, style, onClick, children }) => {
    return <div id={id} className={merge("ui-list", className)} style={style} onClick={onClick}>{children}</div>
}