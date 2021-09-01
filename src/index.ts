import { Options, Traveller, UserOptions } from './interfaces';
import * as parser from './parser';
import * as travellers from './travellers';

export * from './interfaces';

const defaultOptions: Options = {
    type: null,
    format: 'default',
    strip: false,
    transform: true,
    debug: false,
};

export default async (content: string, options: UserOptions) => {
    const mergedOptions = Object.assign({}, defaultOptions, options ?? {});

    const { type } = mergedOptions;

    if (!type) {
        throw new Error('type is not defined.');
    }

    const ast = await parser.parse(content, type);

    let traveller: Traveller;

    switch (type) {
        case 'less':
            traveller = travellers.less;
        //no default
    }

    const variables = parser.travel(ast, traveller);

    return variables;
};
