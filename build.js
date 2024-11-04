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
          filename: 'load-vanilla-beans.js'
        }
      }
]

webpack(wpconfig, (err) => {
    if (err) {
        console.error(err)
        return
    }
})