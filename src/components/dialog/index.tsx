import React, { FC, CSSProperties, ReactNode } from 'react';

import { Portal } from '../portal';
import { merge } from '../../utils/merge';
import { Backdrop } from '../backdrop';
import { Card } from '../card';
import { useDelayBoolean } from '../../hooks/use-delay-boolean';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    width?: number;
    open: boolean;
    children: () => ReactNode;
}

/**
 * Dialog component for displaying related but long form actions.
 */
export const Dialog: FC<Props> = ({ id, className, style, width, open, children }) => {

    const render = useDelayBoolean(open, 500);

    return <Portal>
        <Backdrop className="ui-dialog__backdrop" open={open} />
        <div id={id} className={merge("ui-dialog", className, { 'ui-dialog--show': open })} >
            <Card
                className="ui-dialog__card"
                style={{ maxWidth: width, ...style }}
            >
                {render && children()}
            </Card>
        </div>
    </Portal >

}