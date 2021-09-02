import { AtRule, Comment, Rule, Declaration } from 'postcss';

/**
 * How to format variable
 */
export type FormatType = 'camelCase' | 'kebabCase' | 'default';

/**
 * Type of parser
 */
export type ParserType = 'less';

export interface Options {
    /**
     * Type of parser
     */
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
     * transform variables in current result
     *
     * @default true
     */
    transform: boolean;
}

export type UserOptions = Partial<Options> & { type: Options['type'] };

export type Variables = Record<string, string>;

export interface Output {
    variables: Variables;
}

export interface Traveller {
    result: Variables;
    onAtRule?: (node: AtRule) => void;
    onRule?: (node: Rule) => void;
    onComment?: (node: Comment) => void;
    onDeclaration?: (node: Declaration) => void;
}
