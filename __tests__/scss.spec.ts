import getVars, { UserOptions } from '../src';
import { getScss } from './utils';

const getScssVariables = (options: Omit<UserOptions, 'type'> = {}) => getVars(getScss(), { type: 'scss', ...options });

test('default', async () => {
    const { variables } = await getScssVariables();

    //variables
    expect(Object.keys(variables).length).toBe(6);

    //strip
    expect('$nav-color' in variables).toBeTruthy();
    expect('nav-color' in variables).toBeFalsy();

    //format
    expect('$translucentRed' in variables).toBeTruthy();

    //transform
    expect(variables['$highlight-border']).toStrictEqual('1px solid #f90');
});

test('strip', async () => {
    const { variables } = await getScssVariables({ strip: true });

    expect('$nav-color' in variables).toBeFalsy();
    expect('nav-color' in variables).toBeTruthy();
});

test('camelCase format', async () => {
    const { variables } = await getScssVariables({ format: 'camelCase' });

    expect('$nav-color' in variables).toBeFalsy();
    expect('$navColor' in variables).toBeTruthy();
    expect('$translucentRed' in variables).toBeTruthy();
});

test('kebabCase format', async () => {
    const { variables } = await getScssVariables({ format: 'kebabCase' });
    expect('$nav-color' in variables).toBeTruthy();
    expect('$translucentRed' in variables).toBeFalsy();
    expect('$translucent-red' in variables).toBeTruthy();
});

test('transform', async () => {
    const { variables } = await getScssVariables({ transform: false });

    expect(variables['$highlight-border']).toStrictEqual('1px solid $highlight-color');
});
