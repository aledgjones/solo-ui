import React, { useState, useMemo, CSSProperties, FC, useRef, useEffect } from 'react';
import { mdiChevronDown } from '@mdi/js';

import { merge } from '../../utils/merge';
import { Icon } from '../icon';
import { Card } from '../card';

import '../input-base/styles.css';
import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    value: any;
    label: string;
    color: string;
    disabled?: boolean;

    onChange: (value: any) => void;
}

/**
 * Select component to be used with the Option component.
 */
export const Select: FC<Props> = ({ id, className, style, value, children, label, onChange, color, disabled }) => {

    const [focus, setFocus] = useState<boolean>(false);
    const element = useRef<HTMLDivElement>(null);

    const display = useMemo(() => {
        let _display = '';
        React.Children.forEach(children, (child: any) => {
            if (child.props.value === value) {
                _display = child.props.displayAs;
            }
        });
        return _display;
    }, [value, children]);

    // auto close
    useEffect(() => {
        const cb = (e: any) => {
            if (!element.current || !element.current.contains(e.target)) {
                setFocus(false);
            } else {
                setFocus(o => !o);
            }
        }
        document.addEventListener('click', cb);
        return () => document.removeEventListener('click', cb);
    }, [element]);

    const highlight = useMemo(() => {
        if (disabled) {
            return undefined;
        }
        if (focus) {
            return color;
        }
        return undefined;
    }, [disabled, focus, color]);

    return <div
        id={id}
        className={merge('ui-select', 'ui-input', { 'ui-input--disabled': disabled }, className)}
        style={style}
        ref={element}
    >

        {label && <p style={{ color: focus ? color : undefined }} className="ui-input__label ui-input__label--float">{label}*</p>}

        <div
            className="ui-select__container ui-input__container"
            style={{ border: highlight ? `1px solid ${highlight}` : undefined, ...style }}
        >
            <p className="ui-input__display">{display}</p>
            <Icon className="ui-select__icon" style={{ transform: focus ? 'rotateZ(180deg)' : undefined }} size={24} color="#777777" path={mdiChevronDown} />
        </div>

        {focus && <Card className="ui-select__card">
            {
                React.Children.map(children, (child: any) => {
                    return <div
                        key={child.props.value}
                        className="ui-select__item"
                        onClick={() => {
                            onChange(child.props.value);
                        }}
                    >
                        {child}
                    </div>;
                })
            }
        </Card>}

    </div>;
}