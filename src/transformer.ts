import { Variables } from './interfaces';
import escapeRegExp from 'lodash.escaperegexp';

/**
 * transform variables of object's value
 * @param currentVars
 * @param variables
 */
const transformVariables = (currentVars: Record<string, string[]>, variables: Variables, prefix: string) => {
    const HAS_VARIABLE_REG_EXP = new RegExp(escapeRegExp(prefix));

    for (const key in currentVars) {
        for (const item of currentVars[key]) {
            if (!HAS_VARIABLE_REG_EXP.test(variables[item])) {
                variables[key] = variables[key].replace(item, variables[item]);
                if (!HAS_VARIABLE_REG_EXP.test(variables[item])) {
                    delete currentVars[key];
                }
            }
        }
    }

    if (Object.keys(currentVars).length) {
        transformVariables(currentVars, variables, prefix);
    }
};

/**
 * transform vars to value.
 *
 * @example
 *
 * ```ts
 * const vars: Record<string,string> = {
 *   '@color': '#ffffff',
 *   '@bg-color': '@color',
 * }
 *
 * transform(vars); // {'@color': '#ffffff', '@bg-color': '#ffffff' }
 * ```
 */
export const transform = (variables: Variables, prefix: string) => {
    const currentVars: Record<string, string[]> = {};

    const PREFIX_REG_EXP = new RegExp(escapeRegExp(prefix), 'g');

    /**
     * search vars.
     */
    for (const key in variables) {
        const value = variables[key];

        const matches = value.matchAll(PREFIX_REG_EXP);

        let endFlag = 0;

        for (const match of matches) {
            endFlag = value.search(/[;,]/);

            const searchResult = value.substring(match.index as number, endFlag === -1 ? value.length : endFlag);

            (currentVars[key] ||= []).push(searchResult);
        }
    }

    transformVariables(currentVars, variables, prefix);

    return variables;
};
