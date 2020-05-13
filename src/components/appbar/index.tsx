import React from "react";

import { SuperFC } from "../../generic";
import { merge } from "../../utils/merge";

import "./styles.css";

interface Props {
    shadow?: boolean;
}
/**
 * A basic top of screen app bar with dynamic shadow.
 */
export const Appbar: SuperFC<HTMLDivElement, Props> = ({ className, shadow, children, ...props }) => {
    return (
        <header className={merge("ui-appbar", { "ui-appbar--shadow": shadow }, className)} {...props}>
            <div className="ui-appbar__content">{children}</div>
        </header>
    );
};
