
//@ts-check

import NS from './ns.mjs'

/**
 */
var modules = {}


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
                create: function (tag, attributes, children) {
                    return create(tag, attributes, children, appContext, moduleSrc)
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
        console.warn('Module "' + module.src + '" already exists')
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
 * @param {string | undefined} tag
 * @param {{[x:string]:any} | undefined} attributes
 * @param {Array | undefined} children
 * @param {{} | undefined} appContext
 * @param {string} moduleSrc
 * @param {{} | void} [rootRef]
 */
function create(tag, attributes, children, appContext, moduleSrc, rootRef) {

    if (!tag) throw new Error('Tag should not be empty')
    tag = tag.toUpperCase()
    attributes = attributes || {}
    children = children || []

    var document = factory.document

    var result

    var def = searchBean(moduleSrc, tag)
    if (def && def.bean) {
        var beanattr = mix(
            mix({}, def.bean.a), attributes
        )
        var beanRef = {}
        result = create(def.bean.t, beanattr, def.bean.c, appContext, def.src, beanRef)
        result.fullTagName = tag
        initNode(result, def.bean, appContext, factory(moduleSrc), beanRef, moduleSrc)

    } else {
        result = document.createElement(attributes[NS.USETAG] || tag)
    }
    setAttributes(result, attributes, true)

    rootRef = rootRef || {}

    var currentContentBody = result.beanContentBody || result, beanContentBody = currentContentBody

    children.forEach(function (item) {
        if (!item) return
        if (!item.t) {
            (result.beanContentBody || result).appendChild(document.createTextNode(item))
            return
        }

        var child = create(item.t, item.a, item.c, appContext, moduleSrc, rootRef)
        var ref = getA(item, NS.REF)
        ref && setProperty(rootRef, ref, child, true)

        beanContentBody = (typeof getA(item, NS.BODY) !== 'undefined') && child || beanContentBody

        currentContentBody.appendChild(child)
    })

    result.beanContentBody || setProperty(result, 'beanContentBody', beanContentBody, true)
    return result
}

/**
 * @param {{ a: any; }} definition
 * @param {string | number} attribute
 */
function getA(definition, attribute) {
    return (definition.a || {})[attribute]
}

/**
 * 
 * @param {string} rootSrc 
 * @param {string} fullTagname 
 * @returns 
 */
function searchBean(rootSrc, fullTagname) {
    if (!('' + rootSrc) || !('' + fullTagname)) return

    var path = fullTagname.split('.')
    var src = rootSrc
    var i = 0, localTagname

    while (modules[src] && path[i] && modules[src].imports[path[i]] && modules[src].imports[path[i]].type === 'html') {
        src = modules[src].imports[path[i]].src
        i++
    }

    localTagname = (path.slice(i) || []).join('.')
    var bean = modules[src].beans[localTagname.toUpperCase()]
    return { src: src, tag: localTagname, bean: bean }
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
 */
function setProperty(on, name, value, freeze) {
    if (typeof value === 'undefined') return
    Object.defineProperty(on, name, {
        value: value,
        writable: !freeze,
        configurable: !freeze,
        enumerable: true
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
            if (clean && key.startsWith(NS.NS)) continue
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
        var target = (parent && parent.beanContentBody || parent)
        if (!target || !target.appendChild) return
        (before && target.insertBefore(this, before)) ||
            (before === 0 && target.insertBefore(target.firstChild)) ||
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
        this.parentElement && this.parentElement.removeChild(this)
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
    beanUpdate: function (data) {
        this.onBeanUpdate && this.onBeanUpdate(data)
    },
    beanDestroy: function () {
        this.onBeanStop && this.onBeanStop()
        this.onBeanUnmount && this.onBeanUnmount()
        this.parentElement && this.parentElement.removeChild(this)
        while (this.childNodes && this.childNodes.length > 0) {
            (this.childNodes[0].beanDestroy && this.childNodes[0].beanDestroy()) ||
                (this.childNodes[0].beanDestroy = handlers.beanDestroy) && this.childNodes[0].beanDestroy()
        }
        return true
    }
}

function walkUp(node, foreach) {
    foreach(node)
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
    while (test.parentElement) {
        if (test.parentElement === factory.document.documentElement) return true
        test = test.parentElement
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
            return modules[modules[moduleSrc].imports[moduleKey].src].evaluated
        } catch (error) {
            throw new Error('CJS module "' + moduleKey + '" was not found in "' + moduleSrc + '"')
        }
    }
}
