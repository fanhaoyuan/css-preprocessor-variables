import { Variables, Options, FormatType } from './interfaces';
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

export type FormatOptions = Pick<Options, 'format' | 'strip'>;
export type Formatter = (str: string) => string;

/**
 * base formatter.
 *
 * nothing to change.
 * @param str
 * @returns
 */
const normalFormatter: Formatter = (str: string) => str;

/**
 * get formatter by format type.
 * @param format format type
 * @returns
 */
const getFormatter = (format: FormatType) => {
    let formatter: Formatter;

    switch (format) {
        case 'camelCase':
            formatter = camelCase;
            break;
        case 'kebabCase':
            formatter = kebabCase;
            break;
        case 'default':
        default:
            formatter = normalFormatter;
    }

    return formatter;
};

/**
 * format variables object keys by formatter.
 * @param variables variables object
 * @param options transform options
 * @returns
 *
 * new object of formatted variables.
 */
export const format = (variables: Variables, options: FormatOptions) => {
    const vars: Variables = {};

    const formatter = getFormatter(options.format);

    for (const key in variables) {
        //Avoid the influence of prefix
        let formattedKey = formatter(key.replace('@', ''));

        if (!options.strip) {
            formattedKey = `@${formattedKey}`;
        }

        vars[formattedKey] = variables[key];
    }

    return vars;
};
