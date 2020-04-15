/**
 * Merge strings into single string with conditional inclusion. Useful for className strings
 *
 * merge('foo', 'bar') => 'foo bar';
 * merge('foo', {'bar': false}) => 'foo';
 */
export declare function merge(...args: Array<string | {
    [prop: string]: boolean | undefined;
} | undefined>): string;
