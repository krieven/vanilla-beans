//@ts-check
'use strict'

import htmlDomParser from "../html-dom-parser.mjs";
import parser from "../parser.mjs";
import path from "../path.mjs";
import prepare from "../prepare-module.mjs";
import xhr from "./xhr.mjs";
import factory from "../factory.mjs";

/**
 * Загружает модуль со всеми зависимостями и отдаёт в коллбэк фабрику,
 * готовую к инициализации контекстом
 * 
 * @param {string} src URI
 * @param {(factory: undefined | {
 *      with:(context:any) => {
 *          create:(tag:string, attributes:{[x:string]:any}, children:any) => void | Node
 *      }
 * })=>void} onReady callback
 */
export default function loadVanillaBeans(src, onReady) {
    src = path.normalize(src)
    loadDependencyTree(src, 'html', function () {
        onReady(factory(src))
    })
}

var LOADING = 1, READY = 2


var parse = parser(htmlDomParser).parse

var status = {}

var loadingHandler = {}

/**
 * загружает все незагруженные ранее модули из дерева зависимостей и регистрирует их в фабрике
 * вызывает колбэк после загрузки в фабрику всех необходимых модулей
 * 
 * Алгоритм загрузки зависимостей 
 
1. загрузить все незагруженные модули по дереву
    1 если модуль загружен - вызвать кллбэк
2. зарегистрировать их в фабрике
 
 * 
 * @param {string} src
 * @param {string} type
 * @param {{(): void;(arg0: {with: (appContext: any) => {create: (tag: string, attributes: undefined | {[x: string]: any;}, children: undefined | []) => (void | Node);};}): void;}} onloadTree
 */
function loadDependencyTree(src, type, onloadTree) {
    console.log('load tree', src)

    //загруженные модули для регистрации в фабрике
    var modules = {}
    //
    var requests = []

    //загружает первый из списка и вызывает колбэк с оставшимся списком
    /**
     * 
     * @param {string} src 
     * @param {string} type 
     * @param {()=>void} onsuccess 
     * @returns 
     */
    function load(src, type, onsuccess) {
        //если уже загружен в фабрику
        if (factory.has(src) || modules[src]) {
            doSuccess(src, onsuccess)
            return
        }
        //если начали грузить раньше но не загрузили пока
        if (requests.indexOf(src)>=0) {
            loadingHandler[src].push(
                function () { doSuccess(src, onsuccess) }
            )
            return
        }
        requests.push(src)
        loadingHandler[src] = [function () { doSuccess(src, onsuccess) }]
        xhr(src, function(error, response){
            if(error) {
                console.error(error)
                return
            }
            var module = prepare(type==='html' && parse(response) || response, src, type)
            if(!module){
                console.warn('Module', src, 'is empty!')
                doSuccess(src, onsuccess)
                return
            }
            modules[src] = module
            // @ts-ignore
            module.imports && Object.keys(module.imports).forEach(function (key) {
                // @ts-ignore
                var imp = module.imports[key]
                load(imp.src, imp.type, function(){doSuccess(imp.src, onsuccess)})
            })
            doSuccess(src, onsuccess)
        })
    }


    load(src, type, function () {
        if (requests.length) {
            return
        }
        Object.keys(modules).forEach(function (key) {
            if (!factory.has(modules[key].src)) {
                factory.put(modules[key])
            }
        })
        onloadTree()
    })



    /**
     * 
     * 
     * @param {string} src
     * @param {() => void} onsuccess
     */
    function doSuccess(src, onsuccess) {
        requests = exclude(requests, src);
        while (loadingHandler[src] && loadingHandler[src].length) {
            loadingHandler[src].shift()()
        }
        onsuccess();
    }
}

/**
 * возвращает новый массив без удаляемого элемента
 * не меняет исходный массив
 * 
 * @param {any[]} array исходный массив
 * @param {any} obj удаляемый элемент
 */
function exclude(array, obj) {
    return array.filter(function (item) { return item !== obj })
}











