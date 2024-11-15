import prepareBean from './prepare-bean.mjs'
import path from '../path.mjs'
import { attrToObj } from './utils.mjs'
import NS from './ns.mjs'
import strtoupper from '../strtoupper.mjs'

/**
 * 
 * @param {Array<Element> | string} source 
 * @param {string} src 
 * @param {string} type
 * @param {boolean} [hideSourceURL]
 * @returns {undefined | BeansModule | CJSModule | CSSModule}
 */
export default function prepare(source, src, type, hideSourceURL) {
    if (typeof source === 'string') {
        if (type === 'cjs') {
            var sourceURL = !hideSourceURL && '//# sourceURL=vanilla-cjs:///' + src
            var evaluated = new Function('var module={};\n' +
                source 
                + '\nreturn module.exports;\n'
                + sourceURL)()
            return { script: source, src: src, evaluated: evaluated }
        }
        if (type === 'css') {
            return {style: source, src: src}
        }
        return
    }

    var result = { beans: {}, imports: {}, src: src }

    for (var i = 0; i < source.length; i++) {
        var node = source[i]
        var attributes = attrToObj(node.attributes)
        var as = attributes && attributes[NS.AS]
        if (!as) continue
        as = strtoupper(as)
        if (node.tagName.toLowerCase() === NS.IMP) {
            var holder = result.imports
            if (holder[as]) {
                throw new Error('Dublicate of import key "%s" declaration defined in "%s"', as,  src)
            }
            holder[as] = { src: path.resolve(src, attributes.src), type: attributes.type }
            continue
        }
        if (result.beans[as]) {
            throw new Error('Not unique Bean name "%s" defined in module "%s"', as, src)
        }
        result.beans[as] = prepareBean(node, src, undefined, hideSourceURL)
    }
    return result
}



