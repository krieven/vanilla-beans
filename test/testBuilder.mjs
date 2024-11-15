import builder from '../builder/builder.mjs'
import path from 'path'

const built = builder(
    path.resolve('docs/examples/logo/beans/logo.beans.htm'), 
    path.resolve('test/generated/logo.beans.js')
)

console.log(built)
