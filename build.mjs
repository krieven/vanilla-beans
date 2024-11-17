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

const wpconfig = [
  //library
    {
        mode: 'production',
        name: 'loadVanillaBeans',
        target: 'web',
        entry: './lib/loader/load-vanilla-beans.mjs',
        output: {
          path: path.resolve(__dirname, './bundles/'),
          filename: 'load-vanilla-beans.global.js',
          environment: {
            arrowFunction:false
          },
          library: {
            name: 'loadVanillaBeans',
            type: 'var',
            export: 'default'
          }
        }
      },
      {
        mode: 'production',
        name: 'vanillaBeansFactory',
        target: 'web',
        entry: './lib/factory/factory.mjs',
        output: {
          path: path.resolve(__dirname, './bundles/'),
          filename: 'vanilla-beans-factory.global.js',
          environment: {
            arrowFunction:false
          },
          library: {
            name: 'vanillaBeansFactory',
            type: 'var',
            export: 'default'
          }
        }
      },
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
            arrowFunction:false
          }
        }
      }
]

webpack(wpconfig, (err) => {
    if (err) {
        console.error(err)
        return
    }
})