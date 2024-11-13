//@ts-check

import NS from './ns.mjs'
import probe from '../probe.mjs'
import strtoupper from '../strtoupper.mjs'
import {startsWith} from '../startswith.mjs'

/**
 */
var modules = {}

var builtins = {}


/**
 * 
 * @param {string} moduleSrc 
 * @returns {Factory}
 */
export default function factory(moduleSrc) {
    moduleSrc = moduleSrc + ''
    if (!has(moduleSrc)) throw new Error('Module ' + moduleSrc + ' not found')
    return {
        with: function (appContext) {
            return {
                create: function (tag, attributes) {
                    return create(null, tag, attributes, undefined, appContext, moduleSrc)
                }
            }
        }
    }
}

factory.document = window.document

/**
 * 
 * @param {BeansModule | CJSModule | CSSModule} module 
 * @returns 
 */
factory.put = function (module) {
    if (has(module.src)) {
        console.warn('Module "%s" already exists', module.src)
        return
    }
    modules[module.src] = module
    return factory
}
/**
 * 
 */
var has = factory.has = function (/** @type {string | number} */ moduleKey) {
    return !!modules[moduleKey]
}

/**
 * @param {string|null} ns
 * @param {string | undefined} tag
 * @param {{[x: string]: any;} | undefined} attributes
 * @param {Array<BeanDescriptor | string> | undefined} children
 * @param {{} | undefined} appContext
 * @param {string} moduleSrc
 * @param {{} | void} [rootRef]
 * 
 * @returns {Element}
 */
function create(ns, tag, attributes, children, appContext, moduleSrc, rootRef) {
    ns = attributes && attributes.xmlns || ns

    if (!tag) throw new Error('Tag should not be empty')

    attributes = attributes || {}
    children = children || []

    var document = factory.document

    var result

    var def = builtins[strtoupper(tag)] || searchBean(moduleSrc, strtoupper(tag))
    if (def && def.create) {
        return def.create(ns, tag, attributes, children, appContext, moduleSrc, rootRef)
    }
    if (def && def.bean) {
        var beanattr = mix(mix({}, def.bean.a), attributes)
        var beanRef = {}
        result = create(ns, def.bean.t, beanattr, def.bean.c, appContext, def.src, beanRef)
        initNode(result, def.bean, appContext, factory(moduleSrc), beanRef, moduleSrc)
    } else {
        var usetag = attributes[NS.USE] || tag
        var shadow = attributes[NS.SDW]
        var style = attributes[NS.STL]
        result = ns && document.createElementNS(ns, usetag) || document.createElement(usetag)
        try {
            var shadowRoot = shadow && result.attachShadow(toShadowOptions(shadow))
            shadowRoot && setProperty(result, '_SDW', shadowRoot, true, true) //костыляем, ибо mode=closed не даст добраться до el.shadowRoot, а нам надо
            result._BODY = shadow && shadowRoot || result
            shadow && style &&
                addStyles(result._BODY, strtoupper(style).replace(/\s+/g, '').split(';'), moduleSrc)
        } catch (e) {
            console.error(e)
        }
        setAttributes(result, attributes, true)
    }

    rootRef = rootRef || {}

    // @ts-ignore
    createChildren(ns, result, children, appContext, moduleSrc, rootRef)

    return result
}

/**
 * @param {BeanDescriptor} definition
 * @param {string | number} attribute
 */
function getA(definition, attribute) {
    return (definition.a || {})[attribute]
}

/**
 * 
 * 
 * @param {string} rootSrc 
 * @param {string} fullTagname 
 * @returns 
 */
function searchBean(rootSrc, fullTagname) {

    var bean = probe(function () { return modules[rootSrc].beans[fullTagname] }).or()
    if (bean) {
        return { src: rootSrc, tag: fullTagname, bean: bean }
    }

    var path = fullTagname.split('.'),
        src = probe(function () { return modules[rootSrc].imports[path[0]].src }).or(),
        localTagname = path.slice(1).join('.')

    bean = probe(function () { return modules[src].beans[localTagname] }).or()
    if (bean) {
        return { src: src, tag: localTagname, bean: bean }
    }
}

/**
 * Mix mixin's enumerable properties into trg, always returns object
 * 
 * @param {{} | void} trg
 * @param {{} | void} mixin
 * @param {boolean | undefined} [dontOverride]
 * @param {boolean | undefined} [freeze]
 * @returns {{}}
 */
function mix(trg, mixin, dontOverride, freeze) {
    trg = trg || {}; mixin = mixin || {};
    for (var key in mixin) {
        if (dontOverride && typeof trg[key] !== 'undefined') continue
        setProperty(trg, key, mixin[key], freeze)
    }
    return trg;
};

/**
 * @param {any} on
 * @param {PropertyKey} name
 * @param {any} value
 * @param {undefined | boolean} [freeze]
 * @param {boolean | undefined} [hide]
 */
function setProperty(on, name, value, freeze, hide) {
    if (typeof value === 'undefined') return
    Object.defineProperty(on, name, {
        value: value,
        writable: !freeze,
        configurable: !freeze,
        enumerable: !hide
    })
}

/**
 * @param { Element } instance
 * @param {{ [x: string]: string; }} attr
 * @param {boolean} [clean]
 */
function setAttributes(instance, attr, clean) {
    if (attr && instance && instance.setAttribute) {
        for (var key in attr) {
            if (clean && startsWith(key, NS.NS)) continue
            instance.setAttribute(key, attr[key])
        }
    }
}

// var callbacks = {
//     onBeanMount: function () { },
//     onBeanUnmount: function () { },
//     onBeanStart: function () { },
//     onBeanStop: function () { },
//     onBeanUpdate: function (data) { },
//     onBeanDestroy: function () { }
// }

var handlers = {

    beanMount: function (parent, before) {
        this.beanUnmount()
        var target = (parent && parent._BODY || parent._SDW || parent)
        if (!target || !target.appendChild) return
        (before && target.insertBefore(this, before)) ||
            (before === 0 && target.insertBefore(this, target.firstChild)) ||
            target.appendChild(this)
        if (isConnected(this)) {
            walkUp(this, function (child) {
                child.onBeanMount && child.onBeanMount()
            })
        }
        return this
    },
    beanUnmount: function () {
        if (isConnected(this)) {
            walkUp(this, function (child) {
                child.onBeanUnmount && child.onBeanUnmount()
            })
        }
        this.parentNode && this.parentNode.removeChild(this)
        return this
    },
    beanStart: function () {
        walkUp(this, function (child) {
            child.onBeanStart && child.onBeanStart()
        })
    },
    beanStop: function () {
        walkUp(this, function (child) {
            child.onBeanStop && child.onBeanStop()
        })
    },
    beanUpdate: function (data, options, additional) {
        this.onBeanUpdate && this.onBeanUpdate(data, options, additional)
    },
    beanDestroy: function () {
        var node = this._SDW || this
        while (node.childNodes && node.childNodes.length > 0) {
            (node.childNodes[0].beanDestroy && node.childNodes[0].beanDestroy()) ||
                (node.childNodes[0].beanDestroy = handlers.beanDestroy) && node.childNodes[0].beanDestroy()
        }
        this.onBeanStop && this.onBeanStop()
        this.onBeanUnmount && this.onBeanUnmount()
        this.onBeanDestroy && this.onBeanDestroy()
        this.parentNode && this.parentNode.removeChild(this)
        return true
    }
}

function walkUp(node, foreach) {
    foreach(node)
    node = node._SDW || node
    if (!node.childNodes) return
    for (var i = 0; i < node.childNodes.length; i++) {
        walkUp(node.childNodes[i], foreach)
    }
}

/**
 * Test is node connected to document
 */
function isConnected(node) {
    if (typeof node.isConnected !== 'undefined') return node.isConnected
    var test = node
    while (test.parentNode) {
        if (test.parentNode === factory.document.documentElement) return true
        test = test.parentNode
    }
    return false
}

function initNode(result, bean, appContext, generator, ref, moduleSrc) {
    mix(result, handlers, true, true)
    bean && bean.init && bean.init.apply &&
        bean.init.apply(result, [appContext, generator, ref, factory.document, factoryRequire(moduleSrc)])
}

function factoryRequire(moduleSrc) {
    return function (moduleKey) {
        try {
            return modules[modules[moduleSrc].imports[strtoupper(moduleKey)].src].evaluated
        } catch (error) {
            throw new Error('CJSModule "' + moduleKey + '" was not found in "' + moduleSrc + '"')
        }
    }
}

/**
 * @param {string | null} ns
 * @param {Node} result
 * @param {[BeanDescriptor | string]} children
 * @param {{} | undefined} appContext
 * @param {string} moduleSrc
 * @param {void | {} | undefined} rootRef
 */
function createChildren(ns, result, children, appContext, moduleSrc, rootRef) {
    var document = factory.document

    // @ts-ignore
    var currentContentBody = result._BODY || result
    var beanContentBody = currentContentBody

    children.forEach(function (item) {
        if (!item) return
        // @ts-ignore потому что здесь как раз проверяется тип
        if (!item.t) {
            // @ts-ignore потому что здесь может быть только строка
            (result._BODY || result).appendChild(document.createTextNode(item))
            return
        }

        // @ts-ignore потому что здесь и далее может быть только BeanDescriptor
        var child = create(ns, item.t, item.a, item.c, appContext, moduleSrc, rootRef)
        // @ts-ignore
        var ref = getA(item, NS.REF)
        ref && setProperty(rootRef, ref, child, true)

        // @ts-ignore
        beanContentBody = (typeof getA(item, NS.BDY) !== 'undefined') && child || beanContentBody

        currentContentBody.appendChild(child)
    })
    // @ts-ignore
    result._BODY = beanContentBody
    return currentContentBody.childNodes
}

/**
 * 
 * @param {string} shadow 
 * @returns {any}
 */
function toShadowOptions(shadow) {
    var result = { mode: 'open', clonable: false, delegatesFocus: false, serializable: false, slotAssignment: 'named' }
    var strings = ['mode', 'slotAssignment']
    shadow.split(';').forEach(function (part) {
        var pair = part.replace(/\s+/g, '').split('=')
        // @ts-ignore
        result[pair[0]] = probe(function () { return strings.indexOf(pair[0]) < 0 ? pair[1] === 'true' : pair[1] }).or(result[pair[1]])
    })
    return result
}

/**
 * @param {{ appendChild: (arg0: any) => void; adoptedStyleSheets: any[]; }} result
 * @param {string[]} styles
 * @param {string} moduleSrc
 */
function addStyles(result, styles, moduleSrc) {
    var sheets = []
    styles.forEach(function (key) {
        if (!key) return
        var imp = modules[moduleSrc].imports[key]
        if (imp && imp.type === 'css') {
            if (modules[imp.src].evaluated) {
                sheets.push(modules[imp.src].evaluated)
                return
            }
            var attr = {}
            attr[NS.STL] = key
            result.appendChild(builtins[strtoupper(NS.STL)].create(null, '', attr, [], {}, moduleSrc))
        } else {
            console.error('CSSModule %s was not found in %s', key, moduleSrc)
        }
    })
    result.adoptedStyleSheets = sheets
}

/**
 * required attribute: beans-style
 */
builtins[strtoupper(NS.STL)] = {
    create: function (ns, tag, attributes, children, appContext, moduleSrc, rootRef) {
        var document = factory.document
        var result = document.createElement('style')
        var imp = probe(function () {
            return strtoupper(modules[moduleSrc].imports[attributes[NS.STL].split(';')[0]])
        }).or()
        if (!imp || imp.type !== 'css') {
            console.error('CSSModule %s was not found in %s', attributes[NS.STL], moduleSrc)
            return result
        }
        var style = modules[imp.src] && modules[imp.src].style || ''
        result.textContent = '\n' + style + '\n'
        return result
    }
}

builtins[strtoupper(NS.NS) + 'ITERATOR'] = {
    create: function (ns, tag, attributes, templates, appContext, moduleSrc, rootRef) {
        templates = templates && templates.filter(function (templ, i) {
            if (!searchBean(moduleSrc, strtoupper(templ.t))) {
                console.warn(
                    'Bean "%s" is not defined in "%s", template[%d] will be ignored',
                    templ.t,
                    moduleSrc,
                    i
                )
                return false
            }
            return true
        })

        var result = create(ns, 'div', attributes, [], appContext, moduleSrc)
        setProperty(result, 'beanUpdate', function (data, options, additional) {

            this.onBeanUpdate && this.onBeanUpdate(data, options, additional)

            var children = this.children
            var r = 0
            while (r < data.length || r < children.length) {

                if (r < children.length && r < data.length) {
                    children[r].beanUpdate(data[r], options, r)
                    r++
                    continue
                }
                if (r >= data.length) {
                    children[r].beanDestroy()
                    continue
                }
                var template = templates[r % templates.length]
                var child = create(ns, template.t, template.a, template.c, appContext, moduleSrc)
                // @ts-ignore
                child.beanUpdate(data[r], options, r)
                // @ts-ignore
                child.beanMount(this)
                r++
            }

        }, true)

        return result
    }
}

/**
 * очень тупая штука, на основе DocumentFragment
 * не может использовать обработчики жизненного цикла, кроме onBeanUpdate
 * потому что сам никогда не попадает в дерево DOM
 * Через него можно только передавать данные вложенным элементам
 * использовать в списках не получится
 * не имеет смысла как внутренний элемент
 * 
 * no attributes required
 */
builtins[strtoupper(NS.NS) + 'FRAGMENT'] = {
    create: function (ns, tag, attributes, children, appContext, moduleSrc, rootRef) {
        var result = new DocumentFragment();
        rootRef = rootRef || {};
        createChildren(ns, result, children, appContext, moduleSrc, rootRef);
        return result;
    }
}