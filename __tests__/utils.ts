import * as fs from 'fs';
import * as path from 'path';

export const getAsset = (fileName: string) => fs.readFileSync(path.resolve(__dirname, './assets', fileName), 'utf-8');

export const getLess = () => getAsset('normal.less');
