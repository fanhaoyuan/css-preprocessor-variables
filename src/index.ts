import { Options, Traveller, UserOptions, Output } from './interfaces';
import * as parser from './parser';
import { LessTraveller, ScssTraveller } from './travellers';
import * as transformer from './transformer';
import * as formatter from './formatter';
import { getVariablePrefix } from './utils';

export * from './interfaces';

const defaultOptions: Options = {
    type: null,
    format: 'default',
    strip: false,
    transform: true,
    _prefix: '',
};

export default async (content: string, options: UserOptions): Promise<Output> => {
    const mergedOptions = Object.assign({}, defaultOptions, options ?? {}, {
        _prefix: getVariablePrefix(options.type),
    });

    const { type, transform, strip, format, _prefix } = mergedOptions;

    if (!type) {
        throw new Error('type is not defined.');
    }

    const ast = await parser.parse(content, type);

    let traveller: Traveller;

    switch (type) {
        case 'less':
            traveller = new LessTraveller();
            break;
        case 'scss':
            traveller = new ScssTraveller();
        //no default
    }

    let { variables } = parser.travel(ast, traveller);

    if (transform) {
        variables = transformer.transform(variables, _prefix);
    }

    return {
        variables: formatter.format(variables, { format, strip, _prefix }),
    };
};
