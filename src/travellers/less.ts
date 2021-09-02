import { AtRule } from 'postcss';
import { Traveller, Variables } from '../interfaces';

export class LessTraveller implements Traveller {
    result: Variables = {};

    onAtRule(node: AtRule) {
        if ('variable' in node) {
            this.result[`@${node.name}`] = node.params;
        }
    }
}
