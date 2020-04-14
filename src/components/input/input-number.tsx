import React, { FC, useCallback, useState, useEffect } from 'react';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import Big from 'big.js';

import { error } from '../../utils/error';
import { Icon } from '../icon';
import { InputBase } from './input-base';
import { NumberInputProps } from './defs';

import './input-number.css';

export const InputNumber: FC<NumberInputProps> = ({ value, required, step, precision, units, onChange, onBlur, ...props }) => {

    const toValue = useCallback((value: string) => parseFloat(value), []);
    const toPrecision = useCallback((value: any) => new Big(value).toFixed(precision), [precision]);

    const [display, setDisplay] = useState<string>(toPrecision(value));

    useEffect(() => setDisplay(toPrecision(value)), [value, toPrecision]);

    const validate = useCallback((display: string) => {
        if (required && display === '') {
            return error('@ui/input-required', 'Required');
        }

        try {
            new Big(display); // big has stricter parsing so use for number validation
        } catch (e) {
            return error('@ui/input-invalid', 'Invalid number');
        }

        return null;
    }, [required]);

    const _onBlur = useCallback(() => {

        try {
            const val = toPrecision(display); // force precision and force valid numbers
            const parsed = toValue(val);
            setDisplay(val);
            onChange(parsed);
        } catch (e) {
            setDisplay(toPrecision(value));
        }

        if (onBlur) {
            onBlur();
        }

    }, [onBlur, toPrecision, toValue, display, value]);

    const onIncrease = useCallback(() => {

        const val = new Big(value).plus(step).toFixed(precision);
        const parsed = parseFloat(val);
        setDisplay(val);
        onChange(parsed);

    }, [step, value, display, error, precision, onChange]);

    const onDecrease = useCallback(() => {

        const val = new Big(value).minus(step).toFixed(precision);
        const parsed = parseFloat(val);
        setDisplay(val);
        onChange(parsed);

    }, [step, value, display, error, precision, onChange]);

    return <InputBase display={display} required={required} spellcheck={false} validate={validate} onBlur={_onBlur} onChange={setDisplay} {...props}>
        {units && <p className="ui-input-number__units">{units}</p>}
        <div className="ui-input-number__controls">
            <Icon path={mdiChevronUp} size={18} color="#000000" onClick={onIncrease} />
            <Icon path={mdiChevronDown} size={18} color="#000000" onClick={onDecrease} />
        </div>
    </InputBase>;
}