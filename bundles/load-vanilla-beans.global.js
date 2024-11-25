var loadVanillaBeans;!function(){"use strict";var e={d:function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},o:function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}},n={};!function(){e.d(n,{default:function(){return D}});const t={resolve:function(e,n){return"/"===(n=n||"").substr(0,1)||n.split("://")[1]?this.normalize(n):(e=n?this.dirname(e):e,this.normalize(e+n))},dirname:function(e){var n=e.split("?")[0].split("/");return n[n.length-1]="",n.join("/")},normalize:function(e){for(var n=e.split("/"),t=[n[0]],r=1;r<n.length;r++){var o=n[r];"."!=o&&(".."==o&&t.length?t.pop():t.push(o))}return t.join("/")}};var r="beans-";const o={AS:r+"as",TAG:r+"tagname",USE:r+"usetag",REF:r+"ref",BDY:r+"body",SDW:r+"shadow",STL:r+"style",IMP:r+"import",NS:r};function i(e){for(var n={},t=0;t<e.length;t++){var r=e[t];n[r.name.toLowerCase()]=r.value}return n}function a(e){return e&&e.toUpperCase()}function s(e,n,t,r){if(!(e.nodeType>3)){if(!e.tagName){var u=e.textContent||e.innerText;return u&&u.trim()&&u||void 0}var c={t:e.getAttribute(o.TAG)||e.tagName,a:i(e.attributes)},l=e.childNodes||[];for(let o=0;o<l.length;o++){var f=l[o];if("SCRIPT"!==a(f.tagName)){c.c=c.c||[];var d=s(f,n,t||e,r);d&&c.c.push(d)}else t||c.script||(c.script=f.textContent||f.innerText||""),e.removeChild(f),o--}return!t&&e.outerHTML&&!r&&(c.script="/*\n"+(e.outerHTML+"").replace("*/","*\\/")+"\n*/ "+(c.script||"")+"\n\n//# sourceURL=vanilla-beans:///"+n+"/<"+(c.a&&c.a[o.AS]||"")+">"),c.init=c.script&&new Function("$context, $factory, $ref, document, require",c.script),c}}function u(e){return{or:function(n){var t;try{t=e()}catch(e){}return void 0===t?n:t}}}function c(e,n){return e.substring(0,n.length)===n}var l={},f={};function d(e){if(!h(e+=""))throw new Error("Module "+e+" not found");return{with:function(n){return{create:function(t,r){return p(null,t,r,void 0,n,e)}}}}}d.document=window.document,d.put=function(e){if(!h(e.src))return l[e.src]=e,d;console.warn('Module "%s" already exists',e.src)};var h=d.has=function(e){return!!l[e]};function p(e,n,t,r,i,s,h){if(e=t&&t.xmlns||e,!n)throw new Error("Tag should not be empty");t=t||{},r=r||[];var v,y=d.document,w=m(s,a(n));if(w&&w.create)return w.create(e,n,t,r,i,s,h);if(w&&w.bean){var D=b(b({},w.bean.a),t),T={};!function(e,n,t,r,o,i){b(e,g,!0,!0),n&&n.init&&n.init.apply&&n.init.apply(e,[t,r,o,d.document,B(i)])}(v=p(e,w.bean.t,D,w.bean.c,i,w.src,T),w.bean,i,d(s),T,s)}else{var C=t[o.USE]||n,E=t[o.SDW],U=t[o.STL];v=e&&y.createElementNS(e,C)||y.createElement(C);try{var x=E&&v.attachShadow(function(e){var n={mode:"open",clonable:!1,delegatesFocus:!1,serializable:!1,slotAssignment:"named"},t=["mode","slotAssignment"];return e.split(";").forEach((function(e){var r=e.replace(/\s+/g,"").split("=");n[r[0]]=u((function(){return t.indexOf(r[0])<0?"true"===r[1]:r[1]})).or(n[r[1]])})),n}(E));x&&S(v,"_SDW",x,!0,!0),v._BODY=E&&x||v,E&&U&&function(e,n,t){var r=[];n.forEach((function(n){if(n){var i=l[t].imports[n];if(i&&"css"===i.type){var s=l[i.src]||{};if(void 0===s.evaluated)try{var u=new CSSStyleSheet;u.replace(s.style),s.evaluated=u}catch(e){s.evaluated=!1}if(s.evaluated)return void r.push(s.evaluated);var c={};c[o.STL]=n,e.appendChild(f[a(o.STL)].create(null,"",c,[],{},t))}else console.error("CSSModule %s was not found in %s",n,t)}})),e.adoptedStyleSheets=r}(v._BODY,a(U).replace(/\s+/g,"").split(";"),s)}catch(e){console.error(e)}!function(e,n){if(n&&e&&e.setAttribute)for(var t in n)c(t,o.NS)||e.setAttribute(t,n[t])}(v,t)}return N(e,v,r,i,s,h=h||{}),v}function v(e,n){return(e.a||{})[n]}function m(e,n){if(f[n])return f[n];var t=u((function(){return l[e].beans[n]})).or();if(t)return{src:e,tag:n,bean:t};var r=n.split("."),o=u((function(){return l[e].imports[r[0]].src})).or(),i=r.slice(1).join(".");return(t=u((function(){return l[o].beans[i]})).or())?{src:o,tag:i,bean:t}:void 0}function b(e,n,t,r){for(var o in e=e||{},n=n||{})t&&void 0!==e[o]||S(e,o,n[o],r);return e}function S(e,n,t,r,o){void 0!==t&&Object.defineProperty(e,n,{value:t,writable:!r,configurable:!r,enumerable:!o})}var g={beanMount:function(e,n){this.beanUnmount();var t=e&&(e._BODY||e._SDW||e);if(t&&t.appendChild)return n&&t.insertBefore(this,n)||0===n&&t.insertBefore(this,t.firstChild)||t.appendChild(this),w(this)&&y(this,(function(e){e.onBeanMount&&e.onBeanMount()})),this},beanUnmount:function(){return w(this)&&y(this,(function(e){e.onBeanUnmount&&e.onBeanUnmount()})),this.parentNode&&this.parentNode.removeChild(this),this},beanStart:function(){y(this,(function(e){e.onBeanStart&&e.onBeanStart()}))},beanStop:function(){y(this,(function(e){e.onBeanStop&&e.onBeanStop()}))},beanUpdate:function(e,n,t){this.onBeanUpdate&&this.onBeanUpdate(e,n,t)},beanDestroy:function(){for(var e=this._SDW||this;e.childNodes&&e.childNodes.length>0;)e.childNodes[0].beanDestroy&&e.childNodes[0].beanDestroy()||(e.childNodes[0].beanDestroy=g.beanDestroy)&&e.childNodes[0].beanDestroy();return this.onBeanStop&&this.onBeanStop(),this.onBeanUnmount&&this.onBeanUnmount(),this.onBeanDestroy&&this.onBeanDestroy(),this.parentNode&&this.parentNode.removeChild(this),!0}};function y(e,n){if(n(e),(e=e._SDW||e).childNodes)for(var t=0;t<e.childNodes.length;t++)y(e.childNodes[t],n)}function w(e){if(void 0!==e.isConnected)return e.isConnected;for(var n=e;n.parentNode;){if(n.parentNode===d.document.documentElement)return!0;n=n.parentNode}return!1}function B(e){return function(n){try{return l[l[e].imports[a(n)].src].evaluated}catch(t){throw new Error('CJSModule "'+n+'" was not found in "'+e+'"')}}}function N(e,n,t,r,i,a){var s=d.document,u=n._BODY||n,c=u;return t.forEach((function(t){if(t)if(t.t){var l=p(e,t.t,t.a,t.c,r,i,a),f=v(t,o.REF);f&&S(a,f,l,!0),c=void 0!==v(t,o.BDY)&&l||c,u.appendChild(l)}else(n._BODY||n).appendChild(s.createTextNode(t))})),n._BODY=c,u.childNodes}function D(e,n){var r=document.location.origin,o=document.baseURI,i=c(o,r)?o.substring(r.length):o;L(e=t.resolve(i,e),"html",[],(function(){n(d(e))}))}f[a(o.STL)]={create:function(e,n,t,r,i,s,c){var f=d.document.createElement("style"),h=u((function(){return l[s].imports[a(t[o.STL]).split(";")[0]]})).or();if(!h||"css"!==h.type)return console.error("CSSModule %s was not found in %s",t[o.STL],s),f;var p=l[h.src]&&l[h.src].style||"";return f.textContent=p,f}},f[a(o.NS)+"ITERATOR"]={create:function(e,n,t,r,o,i,s){r=r&&r.filter((function(e,n){return!!m(i,a(e.t))||(console.warn('Bean "%s" is not defined in "%s", template[%d] will be ignored',e.t,i,n),!1)}));var u=p(e,"div",t,[],o,i);return S(u,"beanUpdate",(function(n,t,a){n=this.transformBeanData&&this.transformBeanData(n,t,a)||n;for(var s=this.children,u=0;u<n.length||u<s.length;)if(u<s.length&&u<n.length)s[u].beanUpdate(n[u],t,u),u++;else if(u>=n.length)s[u].beanDestroy();else{var c=r[u%r.length],l=p(e,c.t,c.a,c.c,o,i);l.beanUpdate(n[u],t,u),l.beanMount(this),u++}}),!0),b(u,g,!0,!0),u}},f[a(o.NS)+"FRAGMENT"]={create:function(e,n,t,r,o,i,a){var s=new DocumentFragment;return N(e,s,r,o,i,a=a||{}),S(s,"beanUpdate",g.beanUpdate),s}},f[a(o.NS)+"TEXT"]={create:function(e,n,t,r,o,i,a){var s=d.document.createTextNode(u((function(){return r[0].textContent})).or(""));return S(s,"beanUpdate",(function(e,n,t){e=this.transformBeanData&&this.transformBeanData(e,n,t)||e,this.textContent=e}),!0),b(s,g,!0,!0),s}};var T={},C={},E=1,U=2,x=3,M={};function L(e,n,r,u){if(r=r.slice(),C[e]!==x){if(r.indexOf(e)>-1)return console.warn('Recursion detected! "%s" already in path\n%s',e,r.join("\n")),void u();r.push(e),C[e]!==U?C[e]!==E?(C[e]=E,T[e]=[],function(e,n){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState)return 200!=t.status?n(t.status+"\n"+t.responseText,""):void n(!1,t.responseText)},t.open("get",e,!0),t.send(null)}(e,(function(c,l){if(c)throw new Error(c);var f,h,p,v=function(e,n,r,u){if("string"==typeof e)return"cjs"===r?{script:e,src:n,evaluated:new Function("var module={};\n"+e+"\nreturn module.exports;\n//# sourceURL=vanilla-cjs:///"+n)()}:"css"===r?{style:e,src:n}:void 0;for(var c={beans:{},imports:{},src:n},l=0;l<e.length;l++){var f=e[l],d=i(f.attributes),h=d&&d[o.AS];if(h)if(h=a(h),f.tagName.toLowerCase()!==o.IMP){if(c.beans[h])throw new Error('Not unique Bean name "%s" defined in module "%s"',h,n);c.beans[h]=s(f,n,void 0,u)}else{var p=c.imports;if(p[h])throw new Error('Dublicate of import key "%s" declaration defined in "%s"',h,n);p[h]={src:t.resolve(n,d.src),type:d.type}}}return c}((f=l,h=[],(p=document.createElement("div")).innerHTML=f,p.childNodes&&p.childNodes.forEach((function(e){1===e.nodeType&&h.push(e)})),h.length&&h||f),e,n);if(!v)throw new Error("unknown type of module "+e);d.put(v),M[e]=v,C[e]=U,O(v,r,u),function(e){for(;T[e]&&T[e].length;)T[e].shift()()}(e)}))):T[e].push((function(){O(M[e],r,u)})):O(M[e],r,u)}else u()}function O(e,n,t){var r=e.imports?Object.keys(e.imports):[];if(r.length){var o=r.length;r.forEach((function(r){var i=e.imports[r];L(i.src,i.type,n,(function(){--o||A(e.src,t)}))}))}else A(e.src,t)}function A(e,n){C[e]=x,n()}}(),loadVanillaBeans=n.default}();