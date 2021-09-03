import { Traveller, Variables } from '../interfaces';
import { Declaration } from 'postcss';

export class ScssTraveller implements Traveller {
    result: Variables = {};

    onDeclaration(node: Declaration) {
        this.result[node.prop] = node.value;
    }
}
