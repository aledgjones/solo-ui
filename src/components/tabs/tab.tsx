import React, { FC, useCallback, useEffect, useRef } from 'react';

import { useForeground } from '../../hooks/use-foreground';

import './styles.css';

interface Props {
  value: any;
  selected: boolean;
  background: string;
  highlight: string;
  onChange: (value: any) => void;
  setBar: (value: { left: number, width: number }) => void;
}

/**
 * Tab component to be used inside the Tabs component;
 */
export const Tab: FC<Props> = ({ children, value, selected, background, highlight, onChange, setBar }) => {

  const ref = useRef<HTMLDivElement>(null);

  const text = useForeground(selected ? (highlight || '#000000') : (background || '#ffffff'));

  const _onClick = useCallback(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  useEffect(() => {
    if (setBar && selected && ref.current) {
      setBar({ left: ref.current.offsetLeft, width: ref.current.offsetWidth });
    }
  }, [selected, setBar]);

  return <div
    ref={ref}
    className="ui-tab"
    style={{
      color: text,
      transition: selected ? 'color .2s .1s' : 'color .2s'
    }}
    onClick={_onClick}
  >{children}</div>;
}