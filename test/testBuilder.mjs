import builder from '../builder/builder.mjs'
import path from 'path'

builder(
    path.resolve('docs/examples/logo/beans/logo.beans.htm'),
    path.resolve('test/generated/logo.beans.js')
)
