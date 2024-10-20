import htmlDOMParser from '../js/html-dom-parser.mjs'
import parser from '../js/parser.mjs'
import prepare from '../js/prepare-module.mjs'
import factory from '../js/factory.mjs'


const src1 = 'hello-world'

const source1 = document.getElementById(src1)
const list1 = parser(htmlDOMParser).parse(source1.innerHTML)
const def1 = prepare(list1, src1)
// console.log(JSON.stringify(def1, undefined, 2))

factory.put(def1)(def1.src).with({})


const src = 'sources'

const source = document.getElementById(src)
const list = parser(htmlDOMParser).parse(source.innerHTML)
const def = prepare(list, src)
// console.log(JSON.stringify(def, undefined, 2))

factory.put(def)(def.src).with({}).create('hello-').beanMount(document.body)



