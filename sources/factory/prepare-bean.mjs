import NS from './ns.mjs'
import { attrToObj } from './utils.mjs'

/**
 * 
 * @param {ChildNode} node 
 * @param {string} src 
 * @param {ChildNode? | undefined} root
 * @returns {}
 */
export default function prepareBean(node, src, root, hideSourceURL) {
    if (node.nodeType > 3)
        return
    if (!node.tagName) {
        var text = node.textContent || node.innerText || node.innerHTML
        return text && text.trim() && text || undefined
    }

    var tagname = node.getAttribute(NS.TAGNAME)

    var def = { t: (tagname || node.tagName), a: attrToObj(node.attributes) }

    var nodes = node.childNodes || []
    for (let i = 0; i < nodes.length; i++) {
        var child = nodes[i]
        if (child.tagName && child.tagName.toUpperCase() === 'SCRIPT') {
            if (!root && !def.script) {
                def.script = child.textContent || child.innerHTML || child.innerText || ''
            }
            node.removeChild(child)
            i--
            continue
        }
        def.c = def.c || []
        var bean = prepareBean(child, src, root || node, hideSourceURL)
        bean && def.c.push(bean)
    }

    !root && node.outerHTML && !hideSourceURL && (
        def.script = '/\*' + (node.outerHTML + '').replace(def.script, '...').replace('*/', '*\\/') + ' \*\/ ' 
        +(def.script || '') 
        +'\n\n//# sourceURL=vanilla-beans:///' + src + '/<' + (def.a && def.a[NS.AS] || '') + '>'
    ) && (def.init = new Function('$context, $factory, $ref, document, require', def.script))

    return def
}


