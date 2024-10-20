//@ts-check
import loadVanillaBeans from '../../js/loader/loadVanillaBeans.mjs'

loadVanillaBeans('./resources/tree/root.htm', function(factory) {
    console.log('Final ready')
    console.dir(factory)
})

