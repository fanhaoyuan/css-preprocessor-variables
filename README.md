# css-preprocessor-variables

A plugin for convert css preprocessor`s variables to json.

## install

```bash
>$ npm install css-preprocessor-variables
#or
>$ yarn add css-preprocessor-variables
```

## usage

```ts
const getVars: (content: string, options: UserOptions) => Promise<Output>;
```

### example

```ts
const getVars = require('css-preprocessor-variables');

getVars('@primary-color: #ffffff;\n @color: #000000', {type: 'less' }).then({variable} => {
    console.log(variables); // { '@primary-color': '#ffffff', 'color': '#000000' }
});
```

or use it with promise

```ts
(async function () {
    const getVars = require('css-preprocessor-variables');

    const { variables } = await getVars('@primary-color: #ffffff;\n @color: #000000', { type: 'less' });

    console.log(variables); // { '@primary-color': '#ffffff', 'color': '#000000' }
})();
```

[More examples in here](./__tests__)

## options

```ts
export interface Options {
    /**
     * Type of parser
     */
    type: 'less';

    /**
     * Format key of variables
     *
     * @default 'default'
     */
    format: 'camelCase' | 'kebabCase' | 'default';

    /**
     * Whether to remove the prefix
     *
     * @default false
     *
     * If true, strip prefix '@' or '$'
     */
    strip: boolean;

    /**
     * transform variables in current result
     *
     * @default true
     */
    transform: boolean;
}
```

## license

[MIT](./LICENSE)
