//@ts-check
import parse from "./html-dom-parser.mjs";
import path from "../path.mjs";
import prepare from "../factory/prepare-module.mjs";
import xhr from "./xhr.mjs";
import factory from "../factory/factory.mjs";
import { startsWith } from "../startswith.mjs";

/**
 * Загружает модуль со всеми зависимостями и отдаёт в коллбэк фабрику,
 * готовую к инициализации контекстом
 * 
 * @param {string} src URI
 * @param {(factory?: Factory) => void} onReady callback
 */
export default function loadVanillaBeans(src, onReady) {
    var origin = document.location.origin
    var base = document.baseURI
    var url = startsWith(base, origin) ? base.substring(origin.length) : base
    src = path.resolve(url, src)
    load(src, 'html', [], function () {
        onReady(factory(src))
    })
}

var loadHandler = {}

var status = {}, WAITING = 1, RESOLVING = 2, READY = 3
var loaded = {}

/**
 * загружает все незагруженные ранее модули из дерева зависимостей и регистрирует их в фабрике
 * вызывает колбэк после загрузки в фабрику всех необходимых модулей
 * 
 * 
 * @param {string} src
 * @param {string} type
 * @param {string[]} way
 * @param {() => void} onReady
 */
function load(src, type, way, onReady) {
    way = way.slice()
    //готов
    if (status[src] === READY) {
        onReady()
        return
    }
    //recursion
    if (way.indexOf(src) > -1) {
        console.warn('Recursion detected! "%s" already in path\n%s', src, way.join('\n'))
        onReady()
        return
    }
    way.push(src)
    //закачан, разбираемся с импортами
    if (status[src] === RESOLVING) {
        resolve(loaded[src], way, onReady)
        return
    }
    //качаем
    if (status[src] === WAITING) {
        loadHandler[src].push(function () {
            resolve(loaded[src], way, onReady)
        })
        return
    }

    status[src] = WAITING
    loadHandler[src] = []
    xhr(src, function (/** @type {string | undefined} */ error, /** @type {string} */ response) {
        if (error) {
            throw new Error(error)
        }
        var module = prepare(parse(response), src, type)
        if (!module) {
            throw new Error('unknown type of module ' + src)
        }
        factory.put(module)
        loaded[src] = module
        //
        status[src] = RESOLVING
        resolve(module, way, onReady)
        fireLoaded(src)
        //
    })
}

/**
 * 
 * 
 * @param {BeansModule | CJSModule | CSSModule} module
 * @param {string[]} way
 * @param {() => void} onReady
 */
function resolve(module, way, onReady) {
    var keys = module.imports ? Object.keys(module.imports) : []
    if (!keys.length) {
        fireReady(module.src, onReady)
        return
    }
    var countDirectChildren = keys.length
    keys.forEach(
        function (key) {
            // @ts-ignore - потому, что модуль и импорты здесь не могут не быть
            var item = module.imports[key]
            load(item.src, item.type, way, function () {
                countDirectChildren--
                if (!countDirectChildren) {
                    fireReady(module.src, onReady)
                }
            })
        }
    )
}

/**
 * @param {string} src
 * @param { () => void } onReady
 */
function fireReady(src, onReady) {
    status[src] = READY
    onReady()
}

function fireLoaded(src) {
    while (loadHandler[src] && loadHandler[src].length) {
        loadHandler[src].shift()();
    }
}
