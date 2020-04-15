import React, { FC } from 'react';

import { InputProps } from '../input-base/defs';

import { InputEmail } from '../input-email';
import { InputText } from '../input-text';
import { InputPassword } from '../input-password';
import { InputNumber } from '../input-number';

/**
 * Input element with types: 'email' | 'password' | 'text' | 'number'.
 */
export const Input: FC<InputProps> = (props) => {
    switch (props.type) {
        case 'email':
            return <InputEmail {...props} />;
        case 'password':
            return <InputPassword {...props} />;
        case 'number':
            return <InputNumber {...props} />;
        case 'text':
        default:
            return <InputText {...props} />;
    }
}