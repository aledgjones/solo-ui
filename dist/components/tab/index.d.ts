import { FC } from 'react';
import './styles.css';
interface Props {
    value: any;
}
/**
 * Tab component to be used inside the Tabs component;
 */
export declare const Tab: FC<Props>;
interface PropsExtended extends Props {
    selected: boolean;
    highlight: string;
    color: string;
    onChange: (value: any) => void;
    setBar: (value: {
        left: number;
        width: number;
    }) => void;
}
/**
 * Tab component to be used inside the Tabs component;
 */
export declare const TabExtended: FC<PropsExtended>;
export {};
