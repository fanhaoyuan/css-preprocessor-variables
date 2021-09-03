import { Options, Traveller, UserOptions, Output } from './interfaces';
import * as parser from './parser';
import { LessTraveller, ScssTraveller } from './travellers';
import * as transformer from './transformer';
import * as formatter from './formatter';

export * from './interfaces';

const defaultOptions: Options = {
    type: null,
    format: 'default',
    strip: false,
    transform: true,
};

export default async (content: string, options: UserOptions): Promise<Output> => {
    const mergedOptions = Object.assign({}, defaultOptions, options ?? {});

    const { type, transform, strip, format } = mergedOptions;

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
        variables = transformer.transform(variables);
    }

    return {
        variables: formatter.format(variables, { format, strip }),
    };
};
