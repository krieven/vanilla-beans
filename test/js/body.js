import load from '../../lib/loader/load-vanilla-beans.mjs'
import factory from '../../lib/factory/factory.mjs'

factory.cleanAttributes = false

const elements = ['element', 'rootShadow', 'childShadow', 'bodyFirst', 'bodySecond', 'bodyWithChld']

elements.forEach((item) => {
    const element = document.getElementById(item)
    element.onclick = () => {
        if (element.innerHTML) {
            element.children[0].beanDestroy()
            return
        }
        load('./resources/body/' + item + '.test.html', (factory) => {
            factory.with({}).create('root').beanMount(element)
        })
    }
})


