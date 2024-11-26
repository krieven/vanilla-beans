import pkg from 'webpack'
import path from 'path'
import beansBuilder from './builder/builder.mjs'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webpack = pkg.webpack


//build vanilla-beans modules
await beansBuilder(
  path.resolve(__dirname, './docs/examples/logo/beans/logo.beans.htm'),
  path.resolve(__dirname, './docs/examples/logo/generated/logo.beans.js')
)

const wpconfigExamples = [
  //examples
  {
    mode: 'production',
    name: 'vanillaBeansExamples-logo',
    target: 'web',
    entry: './docs/examples/logo/js/standalone.js',
    output: {
      path: path.resolve(__dirname, './docs/examples/logo/js/'),
      filename: 'logo.standalone.js',
      environment: {
        arrowFunction: false
      }
    }
  }
]

webpack(wpconfigExamples, (err) => {
  if (err) {
    console.error(err)
    return
  }
})