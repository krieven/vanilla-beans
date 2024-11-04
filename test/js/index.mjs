import parser from '../../src/parser/parser.mjs'
import { DOMParser } from '@xmldom/xmldom'
import prepare from '../../src/factory/prepare-module.mjs'

import source from '../resources/definitions/test.module.mjs'

const list = parser(new DOMParser('text/html')).parse(source)

const def = prepare(list, '/root/app.html')

console.log(JSON.stringify(def, undefined, 2))

const scr = prepare('console.log(\'Hello World\')', '/js/app.js', 'cjs')

console.log(JSON.stringify(scr, undefined, 2))

