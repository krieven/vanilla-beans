import parse from '../../src/parser/html-dom-parser.mjs'
import prepare from '../../src/factory/prepare-module.mjs'
import factory from '../../src/factory/factory.mjs'



const src1 = 'hello-world'

const source1 = document.getElementById(src1)
const def1 = prepare(parse(source1.innerHTML), src1)
// console.log(JSON.stringify(def1, undefined, 2))

factory.put(def1)(def1.src).with({})


const src = 'sources'

const source = document.getElementById(src)
// const list = parser(htmlDOMParser).parse(source.innerHTML)
const def = prepare(source.children, src)
// console.log(JSON.stringify(def, undefined, 2))

factory.put(def)(def.src).with({}).create('hello-').beanMount(document.body)



