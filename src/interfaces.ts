/**
 * How to format variable
 */
export type FormatType = 'camelCase' | 'kebabCase' | 'default';

/**
 * Type of parser
 */
export type ParserType = 'less' | 'sass' | 'scss';

export interface Options {
    type: ParserType;

    /**
     * Format key of variables
     *
     * @default 'default'
     */
    format: FormatType;

    /**
     * Whether to remove the prefix
     *
     * @default false
     *
     * If true, strip prefix '@' or '$'
     */
    strip: boolean;

    /**
     * Whether open debug mode
     * @default false
     */
    debug: boolean;

    /**
     * transform variables in current result
     *
     * @default true
     */
    transform: boolean;
}

export type UserOptions = Partial<Options> & { type: Options['type'] };
