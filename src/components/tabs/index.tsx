import React, { FC, Children, useState } from 'react';

import { merge } from '../../utils/merge';
import { Tab } from './tab';

import './styles.css';

interface Props {
    value: any;
    onChange: (value: any) => void;

    background: string;
    highlight: string;
    className?: string;
}

/**
 * Tabs component used with the Tab ccomponent.
 */
export const Tabs: FC<Props> = ({ children, value, onChange, background, highlight, className }) => {

    const [bar, setBar] = useState({ left: 0, width: 90 });

    return <div className={merge("ui-tabs", className)} style={{ backgroundColor: background }}>
        {Children.map(children, (child: any) => {
            return <Tab
                value={child.props.value}
                selected={value === child.props.value}
                background={background}
                highlight={highlight}
                onChange={onChange}
                setBar={setBar}
            >{child}</Tab>;
        })}
        <div className="ui-tabs__bar" style={{ backgroundColor: highlight, ...bar }} />
    </div>;
}