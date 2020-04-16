import React, { FC, Children, useState } from 'react';

import { merge } from '../../utils/merge';
import { Tab } from './tab';

import './styles.css';

interface Props {
    value: any;
    onChange: (value: any) => void;

    color: string;
    className?: string;
}

/**
 * Tabs component used with the Tab ccomponent.
 */
export const Tabs: FC<Props> = ({ children, value, onChange, color, className }) => {

    const [bar, setBar] = useState({ left: 0, width: 90 });

    return <div className={merge("ui-tabs", className)}>
        {Children.map(children, (child: any) => {
            return <Tab
                value={child.props.value}
                selected={value === child.props.value}
                color={color}
                onChange={onChange}
                setBar={setBar}
            >{child}</Tab>;
        })}
        <div className="ui-tabs__bar" style={{ backgroundColor: color, ...bar }} />
    </div>;
}