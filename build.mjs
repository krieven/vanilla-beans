import pkg from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webpack = pkg.webpack

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
        arrowFunction: false
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
    name: 'loadVanillaBeansModule',
    target: 'web',
    entry: './lib/loader/load-vanilla-beans.mjs',
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, './bundles/'),
      filename: 'load-vanilla-beans.module.js',
      library: {
        type: 'module',
        // export: 'default'
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
        arrowFunction: false
      },
      library: {
        name: 'vanillaBeansFactory',
        type: 'var',
        export: 'default'
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

