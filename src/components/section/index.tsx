import React, { FC, CSSProperties } from 'react';

import { merge } from "../../utils/merge";

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    width: number;
}

/**
 * Section component.
 */
export const Section: FC<Props> = ({ id, className, style, width, children }) => {
    return <section
        id={id}
        className={merge('ui-section__container', className)}
        style={style}
    >
        <div className="ui-section__content" style={{ maxWidth: width }}>
            {children}
        </div>
    </section>;
}