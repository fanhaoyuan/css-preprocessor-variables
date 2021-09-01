import postcss, { Root, Syntax } from 'postcss';
import lessSyntax from 'postcss-less';
import { ParserType, Traveller } from './interfaces';

export const parse = async (content: string, type: ParserType) => {
    let syntax: Syntax;

    switch (type) {
        case 'less':
            syntax = lessSyntax;
        //no default
    }

    const ast = await postcss().process(content, { syntax });

    return ast.root;
};

export const travel = (ast: Root, traveller: Traveller) => {
    const { onComplete } = traveller();

    return onComplete();
};
