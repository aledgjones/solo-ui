import React, { FC, Fragment } from "react";

interface Props {
    value: any;
    displayAs: string;
}

/** 
 * Option to be used with Select element.
 */
export const Option: FC<Props> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
}