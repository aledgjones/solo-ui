import { CSSProperties, FC } from 'react';
import '../input-base/styles.css';
import './styles.css';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    color: string;
    value: any;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    spellcheck?: boolean;
    onChange: (value: any) => void;
}
/**
 * Auto expanding textarea component.
 */
export declare const Textarea: FC<Props>;
export {};
