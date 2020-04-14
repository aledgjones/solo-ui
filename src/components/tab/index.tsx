import React, { FC, Fragment } from 'react';

interface Props {
  value: any;
}

/**
 * Tab component to be used inside the Tabs component;
 */
export const Tab: FC<Props> = ({ children }) => {
  return <Fragment>{ children }</Fragment>;
}