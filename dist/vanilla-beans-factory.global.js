var vanillaBeansFactory;!function(){"use strict";var n={d:function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}},e={};n.d(e,{default:function(){return u}});var t="beans-";const r={AS:t+"as",TAG:t+"tagname",USE:t+"usetag",REF:t+"ref",BDY:t+"body",SDW:t+"shadow",STL:t+"style",IMP:t+"import",NS:t};function o(n){return{or:function(e){var t;try{t=n()}catch(n){}return void 0===t?e:t}}}function i(n){return n&&n.toUpperCase()}var a={},s={};function u(n){if(!c(n+=""))throw new Error("Module "+n+" not found");return{with:function(e){return{create:function(t,r){return d(null,t,r,void 0,e,n)}}}}}u.document=window.document,u.put=function(n){if(!c(n.src))return a[n.src]=n,u;console.warn('Module "%s" already exists',n.src)};var c=u.has=function(n){return!!a[n]};function d(n,e,t,c,l,b,m){if(n=t&&t.xmlns||n,!e)throw new Error("Tag should not be empty");t=t||{},c=c||[];var y,g=u.document,D=s[i(e)]||f(b,i(e));if(D&&D.create)return D.create(n,e,t,c,l,b,m);if(D&&D.bean){var N=h(h({},D.bean.a),t),w={};!function(n,e,t,r,o,i){h(n,v,!0,!0),e&&e.init&&e.init.apply&&e.init.apply(n,[t,r,o,u.document,S(i)])}(y=d(n,D.bean.t,N,D.bean.c,l,D.src,w),D.bean,l,u(b),w,b)}else{var U=t[r.USE]||e,E=t[r.SDW],C=t[r.STL];y=n&&g.createElementNS(n,U)||g.createElement(U);try{var T=E&&y.attachShadow(function(n){var e={mode:"open",clonable:!1,delegatesFocus:!1,serializable:!1,slotAssignment:"named"},t=["mode","slotAssignment"];return n.split(";").forEach((function(n){var r=n.replace(/\s+/g,"").split("=");e[r[0]]=o((function(){return t.indexOf(r[0])<0?"true"===r[1]:r[1]})).or(e[r[1]])})),e}(E));T&&p(y,"_SDW",T,!0,!0),y._BODY=E&&T||y,E&&C&&function(n,e,t){var o=[];e.forEach((function(e){if(e){var u=a[t].imports[e];if(u&&"css"===u.type){if(a[u.src].evaluated)return void o.push(a[u.src].evaluated);var c={};c[r.STL]=e,n.appendChild(s[i(r.STL)].create(null,"",c,[],{},t))}else console.error("CSSModule %s was not found in %s",e,t)}})),n.adoptedStyleSheets=o}(y._BODY,i(C).replace(/\s+/g,"").split(";"),b)}catch(n){console.error(n)}!function(n,e){if(e&&n&&n.setAttribute)for(var t in e)o=t,i=r.NS,o.substring(0,i.length)===i||n.setAttribute(t,e[t]);var o,i}(y,t)}return B(n,y,c,l,b,m=m||{}),y}function l(n,e){return(n.a||{})[e]}function f(n,e){var t=o((function(){return a[n].beans[e]})).or();if(t)return{src:n,tag:e,bean:t};var r=e.split("."),i=o((function(){return a[n].imports[r[0]].src})).or(),s=r.slice(1).join(".");return(t=o((function(){return a[i].beans[s]})).or())?{src:i,tag:s,bean:t}:void 0}function h(n,e,t,r){for(var o in n=n||{},e=e||{})t&&void 0!==n[o]||p(n,o,e[o],r);return n}function p(n,e,t,r,o){void 0!==t&&Object.defineProperty(n,e,{value:t,writable:!r,configurable:!r,enumerable:!o})}var v={beanMount:function(n,e){this.beanUnmount();var t=n&&n._BODY||n._SDW||n;if(t&&t.appendChild)return e&&t.insertBefore(this,e)||0===e&&t.insertBefore(this,t.firstChild)||t.appendChild(this),m(this)&&b(this,(function(n){n.onBeanMount&&n.onBeanMount()})),this},beanUnmount:function(){return m(this)&&b(this,(function(n){n.onBeanUnmount&&n.onBeanUnmount()})),this.parentNode&&this.parentNode.removeChild(this),this},beanStart:function(){b(this,(function(n){n.onBeanStart&&n.onBeanStart()}))},beanStop:function(){b(this,(function(n){n.onBeanStop&&n.onBeanStop()}))},beanUpdate:function(n,e,t){this.onBeanUpdate&&this.onBeanUpdate(n,e,t)},beanDestroy:function(){for(var n=this._SDW||this;n.childNodes&&n.childNodes.length>0;)n.childNodes[0].beanDestroy&&n.childNodes[0].beanDestroy()||(n.childNodes[0].beanDestroy=v.beanDestroy)&&n.childNodes[0].beanDestroy();return this.onBeanStop&&this.onBeanStop(),this.onBeanUnmount&&this.onBeanUnmount(),this.onBeanDestroy&&this.onBeanDestroy(),this.parentNode&&this.parentNode.removeChild(this),!0}};function b(n,e){if(e(n),(n=n._SDW||n).childNodes)for(var t=0;t<n.childNodes.length;t++)b(n.childNodes[t],e)}function m(n){if(void 0!==n.isConnected)return n.isConnected;for(var e=n;e.parentNode;){if(e.parentNode===u.document.documentElement)return!0;e=e.parentNode}return!1}function S(n){return function(e){try{return a[a[n].imports[i(e)].src].evaluated}catch(t){throw new Error('CJSModule "'+e+'" was not found in "'+n+'"')}}}function B(n,e,t,o,i,a){var s=u.document,c=e._BODY||e,f=c;return t.forEach((function(t){if(t)if(t.t){var u=d(n,t.t,t.a,t.c,o,i,a),h=l(t,r.REF);h&&p(a,h,u,!0),f=void 0!==l(t,r.BDY)&&u||f,c.appendChild(u)}else(e._BODY||e).appendChild(s.createTextNode(t))})),e._BODY=f,c.childNodes}s[i(r.STL)]={create:function(n,e,t,s,c,d,l){var f=u.document.createElement("style"),h=o((function(){return i(a[d].imports[t[r.STL].split(";")[0]])})).or();if(!h||"css"!==h.type)return console.error("CSSModule %s was not found in %s",t[r.STL],d),f;var p=a[h.src]&&a[h.src].style||"";return f.textContent="\n"+p+"\n",f}},s[i(r.NS)+"ITERATOR"]={create:function(n,e,t,r,o,a,s){r=r&&r.filter((function(n,e){return!!f(a,i(n.t))||(console.warn('Bean "%s" is not defined in "%s", template[%d] will be ignored',n.t,a,e),!1)}));var u=d(n,"div",t,[],o,a);return p(u,"beanUpdate",(function(e,t,i){this.onBeanUpdate&&this.onBeanUpdate(e,t,i);for(var s=this.children,u=0;u<e.length||u<s.length;)if(u<s.length&&u<e.length)s[u].beanUpdate(e[u],t,u),u++;else if(u>=e.length)s[u].beanDestroy();else{var c=r[u%r.length],l=d(n,c.t,c.a,c.c,o,a);l.beanUpdate(e[u],t,u),l.beanMount(this),u++}}),!0),u}},s[i(r.NS)+"FRAGMENT"]={create:function(n,e,t,r,o,i,a){var s=new DocumentFragment;return B(n,s,r,o,i,a=a||{}),s}},vanillaBeansFactory=e.default}();