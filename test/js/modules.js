//@ ts-check
import vanillaBeans from '../../sources/loader/loadVanillaBeans.mjs'

console.time('1')
vanillaBeans('./resources/tree/root.htm', function (factory) {
    console.timeEnd('1')
    console.log('Final ready 1')
    console.time('2')
    console.dir(factory)
    factory.with({})
        .create('root')
        .beanMount(document.body)
    console.timeEnd('2')
})

// vanillaBeans('./resources/tree/l2b2.htm', function (factory) {
//     console.log('Final ready 2')
//     console.dir(factory)

// })

