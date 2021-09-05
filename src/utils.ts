import { ParserType } from './interfaces';

export const getVariablePrefix = (type: ParserType) => {
    let prefix: string;

    switch (type) {
        case 'less':
            prefix = '@';
            break;
        case 'scss':
            prefix = '$';
            break;
        default:
            throw new Error('type is not valid.');
    }

    return prefix;
};
