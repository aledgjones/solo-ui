import { FC, CSSProperties } from 'react';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}
export declare const List: FC<Props>;
export {};
