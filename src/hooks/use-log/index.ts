import { useState, useEffect } from "react";
import isString from "lodash.isstring";
import isObject from "lodash.isobject";
import isNumber from "lodash.isnumber";
import isBoolean from "lodash.isboolean";

const styles = `
    body {
        margin: 20px;
        font-family: monospace;
    }
    .prop {
        position: relative;
        margin-left: 20px;
        pointer-events: none;
    }
    .prop__caret {
        position: absolute;
        top: 4px;
        left: -12px;
        cursor: pointer;
        pointer-events: all;
    }
    .prop > .prop {
        display: none;
    }
    .prop > .prop__placeholder {
        display: inline-block;
        cursor: pointer;
        pointer-events: all;
    }
    .prop > .prop__caret--right {
        display: block;
    }
    .prop > .prop__caret--down {
        display: none;
    }
    .prop__expand > .prop {
        display: block !important;
    }
    .prop__expand > .prop__placeholder {
        display: none !important;
    }
    .prop__expand > .prop__caret--right {
        display: none;
    }
    .prop__expand > .prop__caret--down {
        display: block;
    }
    .prop__key {
        color: purple;
    }
    .prop__value--undefined,
    .prop__value--null {
        color: green;
    }
    .prop__value--string {
        color: red;
    }
    .prop__value--number,
    .prop__value--boolean {
        color: blue;
    }
    .prop__value--circular {
        color: grey;
        font-style: italics;
    }
`;

const right =
    '<svg class="prop__caret prop__caret--right" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="grey" d="M21 12l-18 12v-24z"/></svg>';
const down =
    '<svg class="prop__caret prop__caret--down" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="grey" d="M12 21l-12-18h24z"/></svg>';

function parse(win: any, key: string, value: any, path: string, cache: any[]) {
    if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value">"<span class="prop__value--circular">Circular</span>"</span></div>`;
        }
        // Store value in our collection
        cache.push(value);
    }

    if (value === undefined) {
        return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value">"<span class="prop__value--undefined">undefined</span>"</span></div>`;
    }

    if (value === null) {
        return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value">"<span class="prop__value--null">null</span>"</span></div>`;
    }

    if (isString(value)) {
        return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value">"<span class="prop__value--string">${value}</span>"</span></div>`;
    }

    if (isNumber(value)) {
        return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value prop__value--number">${value}</span></div>`;
    }

    if (isBoolean(value)) {
        return `<div class="prop"><span class="prop__key">${key}</span><span>:</span> <span class="prop__value prop__value--boolean">${value}</span></div>`;
    }

    if (Array.isArray(value)) {
        const props: string[] = value.map((_key: string, i: number) => {
            return parse(win, `${i}`, _key, path + key, []);
        });
        const html = props.join("");
        return `<div class="prop ${
            win.__expanded[path + key] ? "prop__expand" : ""
        }" onclick="this.classList.toggle('prop__expand'); window.__expanded['${path +
            key}'] = this.classList.contains('prop__expand'); event.stopPropagation();">${right}${down}<span class="prop__key">${key}</span><span>:</span> <span>[</span>${html}${
            html !== "" ? '<span class="prop__placeholder">...</span>' : ""
        }<span>]</span></div>`;
    }

    if (isObject(value)) {
        const _val: any = value;
        const keys = Object.keys(_val);
        const props: string[] = keys.map((_key) => {
            return parse(win, _key, _val[_key], path + key, []);
        });
        const html = props.join("");
        return `<div class="prop ${
            win.__expanded[path + key] ? "prop__expand" : ""
        }" onclick="this.classList.toggle('prop__expand'); window.__expanded['${path +
            key}'] = this.classList.contains('prop__expand'); event.stopPropagation();">${right}${down}<span class="prop__key">${key}</span><span>:</span> ${
            html === "" ? "{}" : html
        }${html !== "" ? `<span class="prop__placeholder">{...}</span>` : ""}</div>`;
    }

    return "";
}

/**
 * Hook: Logs state to a seperate window, auto updating with the most current values.
 */
export function useLog(obj: any, rootName: string) {
    const [win, setWin] = useState<Window | null>(null);

    // init
    useEffect(() => {
        const view = window.open("", "@ui/debug", "menubar=no,toolbar=no,location=no,titlebar=no,status=no") as any;
        if (view) {
            if (!view.__expanded) {
                view.__expanded = {};
            }
            const style = view.document.createElement("style");
            style.innerHTML = styles;
            view.document.head.appendChild(style);
            setWin(view);
        }
    }, []);

    // render updates
    useEffect(() => {
        if (win) {
            win.document.body.innerHTML = parse(win, rootName, obj, "", []);
        }
    }, [win, obj, rootName]);
}
