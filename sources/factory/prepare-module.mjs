import prepareBean from './prepare-bean.mjs'
import path from '../path.mjs'
import { attrToObj } from './utils.mjs'
import NS from './ns.mjs'

/**
 * 
 * @param {Array<Element> | string} nodes 
 * @param {string} src 
 * @param {string} type
 * @param {boolean} [hideSourceURL]
 * @returns {undefined | BeansModule | CJSModule | CSSModule}
 */
export default function prepare(nodes, src, type, hideSourceURL) {
    if (typeof nodes === 'string') {
        if (type === 'cjs') {
            var source = !hideSourceURL && '//# sourceURL=vanilla-js:///' + src
            var evaluated = new Function('', 'var module={};\n' + nodes + '\nreturn module.exports;\n' + source)()
            return { script: nodes, src: src, evaluated: evaluated }
        }
        if (type === 'css') {
            return { style: nodes, src: src }
        }
        return
    }

    var result = { beans: {}, imports: {}, src: src }

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i]
        var attributes = attrToObj(node.attributes)
        var as = attributes && attributes[NS.AS]
        if (!as) continue
        as = as.toUpperCase()
        if (node.tagName.toLowerCase() === NS.IMPORT) {
            var holder = result.imports
            if (holder[as]) {
                throw new Error('Module with key "' + as + '" already defined in '+src)
            }
            holder[as] = { src: path.resolve(src, attributes['src']), type: attributes['type'] }
            continue
        }
        if (result.beans[as]) {
            throw new Error('Bean "' + as + '" already registered in module "' + src + '"')
        }
        result.beans[as] = prepareBean(node, src, undefined, hideSourceURL)
    }
    return result
}



