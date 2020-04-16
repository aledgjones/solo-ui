import React, { MouseEvent, FC, CSSProperties } from 'react';

import { merge } from '../../utils/merge';
import { useAlpha } from '../../hooks/use-alpha';
import { useForeground } from 'hooks/use-foreground';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    path: string;
    size: number;
    color: string;
    disabled?: boolean;
    toggle?: boolean;

    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Icon which takes an svg path and renders.
 */
export const Icon: FC<Props> = ({ id, className, style, path, size, color, disabled, toggle, onClick }) => {

    const bg = useAlpha(color, toggle ? 1 : .1);
    const fg = useForeground(bg);

    return <div
        id={id}
        className={merge('ui-icon', { 'ui-icon--disabled': disabled, 'ui-icon--hover': !!onClick }, className)}
        style={{ width: size, height: size, ...style }}
        onClick={onClick}
    >
        <div className="ui-icon__touch-target" />
        <svg className="ui-icon__svg" viewBox="0 0 24 24" style={{ width: size, height: size }}>
            <path d={path} style={{ fill: toggle ? fg : color }} />
        </svg>
        <div className={merge("ui-icon__blob", { 'ui-icon__blob--toggle': toggle })} style={{ backgroundColor: bg }} />
    </div >
}