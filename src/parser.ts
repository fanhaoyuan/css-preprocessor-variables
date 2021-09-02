import postcss, { AtRule, Comment, Declaration, Root, Rule, Syntax } from 'postcss';
import lessSyntax from 'postcss-less';
import { ParserType, Traveller, Output } from './interfaces';

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

export type ASTNode = Root | AtRule | Rule;

export const travel = (ast: ASTNode, traveller: Traveller): Output => {
    for (const node of ast.nodes) {
        if (node instanceof AtRule) {
            traveller.onAtRule?.(node);
            continue;
        }

        if (node instanceof Comment) {
            traveller.onComment?.(node);
            continue;
        }

        if (node instanceof Rule) {
            traveller.onRule?.(node);
            continue;
        }

        if (node instanceof Declaration) {
            traveller.onDeclaration?.(node);
            continue;
        }

        if ('nodes' in node) {
            travel(node as ASTNode, traveller);
        }
    }

    return {
        variables: traveller.result,
    };
};
