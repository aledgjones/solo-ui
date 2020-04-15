/**
 * A utility function that opens the system file picker and returs the selected files
 * inside a promise.
 */
export declare function chooseFiles(config?: {
    accept?: string[];
    multiple?: boolean;
}): Promise<{
    files: File[];
    discarded: number;
}>;
