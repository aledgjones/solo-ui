export interface Error {
    code: string;
    message: string;
}
/**
 * Generate an error object, useful for throwing inside a catch block.
 */
export declare function error(code?: string, message?: string): Error;
