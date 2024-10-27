import parser from '../../parser/parser.mjs'
import { DOMParser } from '@xmldom/xmldom'
import prepare from '../../factory/prepare-module.mjs'

import source from '../resources/definitions/test.module.mjs'

const list = parser(new DOMParser()).parse(source)

const def = prepare(list, '/root/app.html')

console.log(JSON.stringify(def, undefined, 2))

const scr = prepare('console.log(\'Hello World\')', '/js/app.html')

console.log(JSON.stringify(scr, undefined, 2))

