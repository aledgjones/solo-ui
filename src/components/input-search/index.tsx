import React, { useCallback, ChangeEvent, FC } from "react";
import { mdiMagnify } from "@mdi/js";

import { SearchInputProps } from '../input-base/defs';
import { merge } from '../../utils/merge';
import { Icon } from '../icon';

import "./styles.css";

export const Search: FC<SearchInputProps> = ({ value, label, onChange, className, ...props }) => {

    const _onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

    return <div className="ui-search__container">
        <Icon className="ui-search__icon ui-search__icon--magnify" path={mdiMagnify} size={24} color="#777777" />
        <input placeholder={label} className={merge("ui-search", className)} value={value} onChange={_onChange}  {...props} />
    </div>
};
