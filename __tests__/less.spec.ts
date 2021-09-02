import getVars, { UserOptions } from '../src';
import { getLess } from './utils';

const getLessVariables = (options: Omit<UserOptions, 'type'> = {}) => getVars(getLess(), { type: 'less', ...options });

test('default', async () => {
    const { variables } = await getLessVariables();

    //variables
    expect(Object.keys(variables).length).toBe(11);

    //strip
    expect('@primary-color' in variables).toBeTruthy();
    expect('primary-color' in variables).toBeFalsy();

    //format
    expect('@fontWeight' in variables).toBeTruthy();

    //transform
    expect(variables['@transform']).toStrictEqual('#ffffff');
    expect(variables['@error-color']).toStrictEqual('#1890ff');
});

test('strip', async () => {
    const { variables } = await getLessVariables({ strip: true });

    expect('@primary-color' in variables).toBeFalsy();
    expect('primary-color' in variables).toBeTruthy();
});

test('camelCase format', async () => {
    const { variables } = await getLessVariables({ format: 'camelCase' });

    expect('@primary-color' in variables).toBeFalsy();
    expect('@primaryColor' in variables).toBeTruthy();
    expect('@fontWeight' in variables).toBeTruthy();
});

test('kebabCase format', async () => {
    const { variables } = await getLessVariables({ format: 'kebabCase' });
    expect('@primary-color' in variables).toBeTruthy();
    expect('@fontWeight' in variables).toBeFalsy();
    expect('@font-weight' in variables).toBeTruthy();
});

test('transform', async () => {
    const { variables } = await getLessVariables({ transform: false });

    expect(variables['@transform']).toStrictEqual('@color');
});
