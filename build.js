const webpack = require('webpack')
const path = require('path')


console.log(__dirname, 'dist/')
const wpconfig = [
    {
        mode: 'production',
        name: 'vanillaBeans',
        target: 'web',
        entry: './src/loader/load-vanilla-beans.mjs',
        output: {
          path: path.resolve(__dirname, './dist/'),
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
        entry: './src/factory/factory.mjs',
        output: {
          path: path.resolve(__dirname, './dist/'),
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
      }
]

webpack(wpconfig, (err) => {
    if (err) {
        console.error(err)
        return
    }
})