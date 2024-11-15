import builder from '../builder/builder.mjs'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

builder(
    path.resolve('docs/examples/logo/beans/logo.beans.htm'),
    path.resolve('test/generated/logo.beans.js')
)
