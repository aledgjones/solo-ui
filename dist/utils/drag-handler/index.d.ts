/// <reference types="react" />
declare type DownCallback<T> = (e: React.PointerEvent) => T | false;
declare type OtherCallback<T> = (e: PointerEvent, data: T) => void;
export interface DragHandlerConfig<T> {
    onDown: DownCallback<T>;
    onMove: OtherCallback<T>;
    onEnd: OtherCallback<T>;
}
/**
 * Boilerplate for adding pointer move events after an initial pointer down event
 */
export declare function dragHandler<T>({ onDown, onMove, onEnd }: DragHandlerConfig<T>): (e: import("react").PointerEvent<HTMLElement>) => void;
export {};
