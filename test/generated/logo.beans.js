export default (function() {
        var vanillaBeansFactory;!function(){"use strict";var n={d:function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}},e={};n.d(e,{default:function(){return u}});var t="beans-";const r={AS:t+"as",TAG:t+"tagname",USE:t+"usetag",REF:t+"ref",BDY:t+"body",SDW:t+"shadow",STL:t+"style",IMP:t+"import",NS:t};function o(n){return{or:function(e){var t;try{t=n()}catch(n){}return void 0===t?e:t}}}function a(n){return n&&n.toUpperCase()}var i={},s={};function u(n){if(!c(n+=""))throw new Error("Module "+n+" not found");return{with:function(e){return{create:function(t,r){return d(null,t,r,void 0,e,n)}}}}}u.document=window.document,u.put=function(n){if(!c(n.src))return i[n.src]=n,u;console.warn('Module "%s" already exists',n.src)};var c=u.has=function(n){return!!i[n]};function d(n,e,t,c,l,b,S){if(n=t&&t.xmlns||n,!e)throw new Error("Tag should not be empty");t=t||{},c=c||[];var B,g=u.document,D=s[a(e)]||f(b,a(e));if(D&&D.create)return D.create(n,e,t,c,l,b,S);if(D&&D.bean){var N=h(h({},D.bean.a),t),w={};!function(n,e,t,r,o,a){h(n,v,!0,!0),e&&e.init&&e.init.apply&&e.init.apply(n,[t,r,o,u.document,m(a)])}(B=d(n,D.bean.t,N,D.bean.c,l,D.src,w),D.bean,l,u(b),w,b)}else{var U=t[r.USE]||e,C=t[r.SDW],E=t[r.STL];B=n&&g.createElementNS(n,U)||g.createElement(U);try{var T=C&&B.attachShadow(function(n){var e={mode:"open",clonable:!1,delegatesFocus:!1,serializable:!1,slotAssignment:"named"},t=["mode","slotAssignment"];return n.split(";").forEach((function(n){var r=n.replace(/\s+/g,"").split("=");e[r[0]]=o((function(){return t.indexOf(r[0])<0?"true"===r[1]:r[1]})).or(e[r[1]])})),e}(C));T&&p(B,"_SDW",T,!0,!0),B._BODY=C&&T||B,C&&E&&function(n,e,t){var o=[];e.forEach((function(e){if(e){var u=i[t].imports[e];if(u&&"css"===u.type){var c=i[u.src]||{};if(void 0===c.evaluated)try{var d=new CSSStyleSheet;d.replace(c.style),c.evaluated=d}catch(n){c.evaluated=!1}if(c.evaluated)return void o.push(c.evaluated);var l={};l[r.STL]=e,n.appendChild(s[a(r.STL)].create(null,"",l,[],{},t))}else console.error("CSSModule %s was not found in %s",e,t)}})),n.adoptedStyleSheets=o}(B._BODY,a(E).replace(/\s+/g,"").split(";"),b)}catch(n){console.error(n)}!function(n,e){if(e&&n&&n.setAttribute)for(var t in e)o=t,a=r.NS,o.substring(0,a.length)===a||n.setAttribute(t,e[t]);var o,a}(B,t)}return y(n,B,c,l,b,S=S||{}),B}function l(n,e){return(n.a||{})[e]}function f(n,e){var t=o((function(){return i[n].beans[e]})).or();if(t)return{src:n,tag:e,bean:t};var r=e.split("."),a=o((function(){return i[n].imports[r[0]].src})).or(),s=r.slice(1).join(".");return(t=o((function(){return i[a].beans[s]})).or())?{src:a,tag:s,bean:t}:void 0}function h(n,e,t,r){for(var o in n=n||{},e=e||{})t&&void 0!==n[o]||p(n,o,e[o],r);return n}function p(n,e,t,r,o){void 0!==t&&Object.defineProperty(n,e,{value:t,writable:!r,configurable:!r,enumerable:!o})}var v={beanMount:function(n,e){this.beanUnmount();var t=n&&n._BODY||n._SDW||n;if(t&&t.appendChild)return e&&t.insertBefore(this,e)||0===e&&t.insertBefore(this,t.firstChild)||t.appendChild(this),S(this)&&b(this,(function(n){n.onBeanMount&&n.onBeanMount()})),this},beanUnmount:function(){return S(this)&&b(this,(function(n){n.onBeanUnmount&&n.onBeanUnmount()})),this.parentNode&&this.parentNode.removeChild(this),this},beanStart:function(){b(this,(function(n){n.onBeanStart&&n.onBeanStart()}))},beanStop:function(){b(this,(function(n){n.onBeanStop&&n.onBeanStop()}))},beanUpdate:function(n,e,t){this.onBeanUpdate&&this.onBeanUpdate(n,e,t)},beanDestroy:function(){for(var n=this._SDW||this;n.childNodes&&n.childNodes.length>0;)n.childNodes[0].beanDestroy&&n.childNodes[0].beanDestroy()||(n.childNodes[0].beanDestroy=v.beanDestroy)&&n.childNodes[0].beanDestroy();return this.onBeanStop&&this.onBeanStop(),this.onBeanUnmount&&this.onBeanUnmount(),this.onBeanDestroy&&this.onBeanDestroy(),this.parentNode&&this.parentNode.removeChild(this),!0}};function b(n,e){if(e(n),(n=n._SDW||n).childNodes)for(var t=0;t<n.childNodes.length;t++)b(n.childNodes[t],e)}function S(n){if(void 0!==n.isConnected)return n.isConnected;for(var e=n;e.parentNode;){if(e.parentNode===u.document.documentElement)return!0;e=e.parentNode}return!1}function m(n){return function(e){try{return i[i[n].imports[a(e)].src].evaluated}catch(t){throw new Error('CJSModule "'+e+'" was not found in "'+n+'"')}}}function y(n,e,t,o,a,i){var s=u.document,c=e._BODY||e,f=c;return t.forEach((function(t){if(t)if(t.t){var u=d(n,t.t,t.a,t.c,o,a,i),h=l(t,r.REF);h&&p(i,h,u,!0),f=void 0!==l(t,r.BDY)&&u||f,c.appendChild(u)}else(e._BODY||e).appendChild(s.createTextNode(t))})),e._BODY=f,c.childNodes}s[a(r.STL)]={create:function(n,e,t,s,c,d,l){var f=u.document.createElement("style"),h=o((function(){return i[d].imports[a(t[r.STL]).split(";")[0]]})).or();if(!h||"css"!==h.type)return console.error("CSSModule %s was not found in %s",t[r.STL],d),f;var p=i[h.src]&&i[h.src].style||"";return f.textContent="\n"+p+"\n",f}},s[a(r.NS)+"ITERATOR"]={create:function(n,e,t,r,o,i,s){r=r&&r.filter((function(n,e){return!!f(i,a(n.t))||(console.warn('Bean "%s" is not defined in "%s", template[%d] will be ignored',n.t,i,e),!1)}));var u=d(n,"div",t,[],o,i);return p(u,"beanUpdate",(function(e,t,a){this.onBeanUpdate&&this.onBeanUpdate(e,t,a);for(var s=this.children,u=0;u<e.length||u<s.length;)if(u<s.length&&u<e.length)s[u].beanUpdate(e[u],t,u),u++;else if(u>=e.length)s[u].beanDestroy();else{var c=r[u%r.length],l=d(n,c.t,c.a,c.c,o,i);l.beanUpdate(e[u],t,u),l.beanMount(this),u++}}),!0),u}},s[a(r.NS)+"FRAGMENT"]={create:function(n,e,t,r,o,a,i){var s=new DocumentFragment;return y(n,s,r,o,a,i=i||{}),s}},vanillaBeansFactory=e.default}();

        [ {"src":1,"evaluated":(function(){ var module = {}; 
const PI = Math.PI
const step = 2 * PI / 5

const angles = [
    PI / 2 - step,
    PI / 2,
    PI / 2 + step,
    PI / 2 + 2 * step,
    PI / 2 + 3 * step
]
const way = [3, 1, 4, 2, 0]

module.exports = function (diameter, petal, lwidth) {

    const radius = diameter / 2
    const center = radius + lwidth

    const coords = angles.map(function (angle) {
        return [
            center + Math.cos(angle) * radius, 
            center - Math.sin(angle) * radius
        ]
    })

    let path = ['M', coords[0][0], coords[0][1]]
    way.forEach(function (point) {
        path = path.concat('A', petal, petal, 0, 0, 0, coords[point][0], coords[point][1])
    })
    path.push('Z')

    return path.join(' ')
}; return module.exports; })()}, {"src":2,"evaluated":(function(){ var module = {}; 
module.exports = {setAttributes: function(on, attributes) {
    Object.keys(attributes).forEach(function(key){
        on.setAttribute(key, attributes[key])
    })
}}
; return module.exports; })()}, {"style":"* { font-family:'Courier New', Courier, monospace; box-sizing: border-box; } body { margin: 0 0 0 100px; font-size: 16px; } h1 { font-size: 40px; } h1, h2, h3, h4, h5, h6 { color: #ff6400; } form, .box { display: inline-block; vertical-align: top; } input, button{ width:70px; } form{ width: 320px; } form { padding: 25px 50px 25px 0; } .box { padding: 25px 50px 25px 50px; } label { display: block; margin: 10px 0; } .bold { font-weight: bold; }","src":3}, {"beans":{"SCREEN":{"t":"main","a":{"beans-as":"screen"},"c":[{"t":"h1","a":{},"c":["Make your Vanilla flower"]},{"t":"form","a":{},"c":[{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"size","value":"100","autofocus":"autofocus"}}," enter flower size"]},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"petal","value":"60"}},"  enter petal radius"]},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"dot","value":"16"}},"  enter dot size"]},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"weight","value":"7"}},"   enter line width"]},{"t":"hr","a":{}},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"rotate","value":"10"}}," rotate flower"]},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"number","beans-ref":"scale","value":"200"}}," scale flower"]},{"t":"hr","a":{}},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"color","beans-ref":"color","value":"#ff6600"}},"\n            choose flower color\n            ",{"t":"span","a":{"class":"bold","beans-ref":"strokeColor"}}]},{"t":"label","a":{},"c":[{"t":"input","a":{"type":"color","beans-ref":"background","value":"#ffffff"}},"\n            choose environment color\n            ",{"t":"span","a":{"class":"bold","beans-ref":"backgroundColor"}}]},{"t":"hr","a":{}},{"t":"button","a":{"type":"reset","beans-ref":"reset"},"c":["reset"]}]},{"t":"div","a":{"class":"box"},"c":[{"t":"div","a":{"beans-ref":"environment"},"c":[{"t":"logo","a":{"beans-ref":"logo"}}]},{"t":"div","a":{"beans-ref":"logoSize"}}]}],"init":function anonymous($context, $factory, $ref, document, require
) {

        {
            const { size, petal, dot, weight, rotate, scale,
                color, strokeColor, background, backgroundColor, reset, environment, logo, logoSize } = $ref;

            function getData() {
                return {
                    size: size.value * 1,
                    radius: petal.value * 1,
                    dot: dot.value * 1,
                    weight: weight.value * 1,
                    color: strokeColor.innerText = color.value,
                    rotate: rotate.value || 0,
                    scale: scale.value / 100 || 1
                }
            }

            function callback(size) {
                logoSize.innerText = size + ' x ' + size
            }

            const presets = getData()
            const bgcolor = background.value

            reset.onclick = () => {
                backgroundColor.innerText = environment.style.backgroundColor = bgcolor
                strokeColor.innerText = presets.color
                logo.beanUpdate(presets, callback)
            }

            {
                (
                    size.oninput =
                    petal.oninput =
                    dot.oninput =
                    weight.oninput =
                    background.oninput =
                    color.oninput =
                    rotate.oninput =
                    scale.oninput =
                    function () {
                        backgroundColor.innerText = environment.style.backgroundColor = background.value
                        logo.beanUpdate(getData(), callback)
                    }
                )()
            }
        }
    
}},"LOGO":{"t":"svg","a":{"beans-as":"logo","xmlns":"http://www.w3.org/2000/svg","version":"1.1"},"c":[{"t":"g","a":{"beans-ref":"container"},"c":[{"t":"path","a":{"beans-ref":"path","fill":"transparent"}},{"t":"circle","a":{"beans-ref":"dot","fill":"transparent"}}]}],"init":function anonymous($context, $factory, $ref, document, require
) {

        // 
        {
            const { container, path, dot } = $ref
            const { setAttributes } = require('utils')

            this.onBeanUpdate = function (data, callback) {

                const size = data.size + data.weight * 2
                const width = (size * data.scale).toFixed(0)
                const center = size / 2

                callback(width)

                const pathD = require('flower')(data.size, data.radius, data.weight)

                setAttributes(this, {
                    'width': width,
                    'height': width
                })

                setAttributes(path, {
                    'd': pathD,
                    'stroke': data.color,
                    'stroke-width': data.weight
                })

                setAttributes(dot, {
                    'cx': center,
                    'cy': center,
                    'r': data.dot / 2,
                    'stroke': data.color,
                    'stroke-width': data.weight
                })

                container.setAttribute('transform',
                    `rotate(${data.rotate} ${center * data.scale} ${center * data.scale}) scale(${data.scale})`
                )
            }
        }
        // 
    
}}},"imports":{"FLOWER":{"src":1,"type":"cjs"},"UTILS":{"src":2,"type":"cjs"},"STYLE":{"src":3,"type":"css"}},"src":0} ].forEach(
            function(module) {
                vanillaBeansFactory.put(module)
            }
        )

        return vanillaBeansFactory
    })()
         
    