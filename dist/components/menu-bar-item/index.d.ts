import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    label: string;
}
export declare const MenuBarItem: FC<Props>;
interface PropsExtended extends Props {
    selected: boolean;
    onSelect: (label: string) => void;
}
export declare const MenuBarItemExtended: FC<PropsExtended>;
export {};
