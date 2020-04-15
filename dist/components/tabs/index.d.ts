import { FC } from 'react';
import './styles.css';
interface Props {
    value: any;
    onChange: (value: any) => void;
    background: string;
    highlight: string;
    className?: string;
}
/**
 * Tabs component used with the Tab ccomponent.
 */
export declare const Tabs: FC<Props>;
export {};
