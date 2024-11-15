import fs from 'fs'
import parser from './parser.mjs'
import { DOMParser } from '@xmldom/xmldom'
import prepare from '../lib/factory/prepare-module.mjs'
import path from 'path'
import { minify } from 'terser'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parse = parser(new DOMParser({ type: 'html' })).parse

//@ts-check

export default async function (src, dest) {
    const modules = {}
    const index = []

    const result = []

    const loadTree = (src, type) => {

        if (index.indexOf(src) >= 0) {
            return
        }

        index.push(src)

        console.log('resolve', src)


        const buffer = fs.readFileSync(src, { flag: 'r' }).toString()

        const beansModule = prepare(parse(buffer), src, type || 'html', true)

        if (beansModule.imports) {
            Object.keys(beansModule.imports).forEach((imp) => {
                loadTree(beansModule.imports[imp].src, beansModule.imports[imp].type)
                beansModule.imports[imp].src = index.indexOf(beansModule.imports[imp].src)
            })
        }

        const replaces = {}

        if (type === 'cjs') {
            const key = '/*script*/'
            replaces[key] = `(function(){ var module = {}; ${beansModule.script}; return module.exports; })()`
            delete beansModule.script
            const key = '##/script/'
            replaces[key] = `(function(){ var module = {}; ${script}; return module.exports; })()`
            beansModule.evaluated = key
        } else if (type === 'css') {
            beansModule.style = beansModule.style.replace(/\/\*[\s\S]*?\*\//gm, ' ').replace(/\s+/g, ' ')
        } else {
            beansModule.beans && Object.keys(beansModule.beans).forEach(
                (key) => {
                    const bean = beansModule.beans[key]
                    if (bean.script) {
                        delete bean.script
                        const skey = key + '/*init*/'
                        replaces[skey] = bean.init.toString()
                        bean.init = skey
                    }
                }
            )
        }

        beansModule.src = index.indexOf(beansModule.src)

        let convert = JSON.stringify(beansModule)

        //make replaces
        Object.keys(replaces).forEach((key) => {
            convert = convert.replace('"' + key + '"', replaces[key])
        })

        modules[src] = convert

        result.push(convert)
    }

    loadTree(src)

    try {
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest));
        }
    } catch (err) {
        console.error(err);
    }

    const factory = fs.readFileSync(
        path.resolve(__dirname, '../bundles/vanilla-beans-factory.global.js')
    ).toString()

    const min = await minify(`export default (function() { ${factory}; [${result.join(', ')}]` +
        '.forEach(function(module) {vanillaBeansFactory.put(module);});' +
        'return vanillaBeansFactory("0");})();')

    fs.writeFileSync(dest, min.code, { flag: 'w+' })
}

        return vanillaBeansFactory
    })()

    `, { flag: 'w+' })

}
