/// <reference types="react" />
import { DragHandlerConfig } from '../../utils/drag-handler';
export declare function useDragHandler<T>(config: DragHandlerConfig<T>, deps: any[]): (e: import("react").PointerEvent<HTMLElement>) => void;
