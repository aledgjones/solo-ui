import React, { ReactNode } from "react";

import { SuperFC } from "../../generic";
import { merge } from "../../utils/merge";
import { useDelayBoolean } from "../../hooks/use-delay-boolean";
import { Portal } from "../portal";
import { Backdrop } from "../backdrop";
import { Card } from "../card";

import "./styles.css";

interface Props {
    width?: number;
    open: boolean;
    children: () => ReactNode;
}

/**
 * Dialog component for displaying related but long form actions.
 */
export const Dialog: SuperFC<Props> = ({ className, style, width, open, children, ...props }) => {
    const render = useDelayBoolean(open, 500);

    return (
        <Portal>
            <Backdrop className="ui-dialog__backdrop" open={open} />
            <div className={merge("ui-dialog", { "ui-dialog--show": open })}>
                <Card className={merge("ui-dialog__card", className)} style={{ maxWidth: width, ...style }} {...props}>
                    {render && children()}
                </Card>
            </div>
        </Portal>
    );
};
