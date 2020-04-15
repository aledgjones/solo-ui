import { FC } from 'react';
import './styles.css';
interface Props {
    value: any;
    selected: boolean;
    background: string;
    highlight: string;
    onChange: (value: any) => void;
    setBar: (value: {
        left: number;
        width: number;
    }) => void;
}
/**
 * Tab component to be used inside the Tabs component;
 */
export declare const Tab: FC<Props>;
export {};
