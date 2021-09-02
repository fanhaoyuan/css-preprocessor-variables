import { Variables } from './interfaces';

/**
 * whether has variable in string.
 * @param str
 * @returns
 */
const hasVariable = (str: string) => /@/.test(str);

/**
 * transform variables of object's value
 * @param currentVars
 * @param variables
 */
const transformVariables = (currentVars: Record<string, string[]>, variables: Variables) => {
    for (const key in currentVars) {
        for (const item of currentVars[key]) {
            if (!hasVariable(variables[item])) {
                variables[key] = item.replace(item, variables[item]);
                if (!hasVariable(variables[key])) {
                    delete currentVars[key];
                }
            }
        }
    }

    if (Object.keys(currentVars).length) {
        transformVariables(currentVars, variables);
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
export const transform = (variables: Variables) => {
    const currentVars: Record<string, string[]> = {};

    /**
     * search vars.
     */
    for (const key in variables) {
        const value = variables[key];

        const matches = value.matchAll(/@/g);

        let endFlag = 0;

        for (const match of matches) {
            endFlag = value.search(/[;,]/);

            const searchResult = value.substring(match.index as number, endFlag === -1 ? value.length : endFlag);

            (currentVars[key] ||= []).push(searchResult);
        }
    }

    transformVariables(currentVars, variables);

    return variables;
};
