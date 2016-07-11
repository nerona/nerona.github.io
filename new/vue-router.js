/*!
 * vue-router v0.7.13
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueRouter=e()}(this,function(){"use strict";function t(t,e,n){this.path=t,this.matcher=e,this.delegate=n}function e(t){this.routes={},this.children={},this.target=t}function n(e,r,i){return function(o,a){var s=e+o;return a?void a(n(s,r,i)):new t(e+o,r,i)}}function r(t,e,n){for(var r=0,i=0,o=t.length;o>i;i++)r+=t[i].path.length;e=e.substr(r);var a={path:e,handler:n};t.push(a)}function i(t,e,n,o){var a=e.routes;for(var s in a)if(a.hasOwnProperty(s)){var h=t.slice();r(h,s,a[s]),e.children[s]?i(h,e.children[s],n,o):n.call(o,h)}}function o(t,r){var o=new e;t(n("",o,this.delegate)),i([],o,function(t){r?r(this,t):this.add(t)},this)}function a(t){B||"undefined"==typeof console||console.error("[vue-router] "+t)}function s(t,e){try{return e?decodeURIComponent(t):decodeURI(t)}catch(n){a("malformed URI"+(e?" component: ":": ")+t)}}function h(t){return"[object Array]"===Object.prototype.toString.call(t)}function c(t){this.string=t}function u(t){this.name=t}function l(t){this.name=t}function p(){}function f(t,e,n){"/"===t.charAt(0)&&(t=t.substr(1));var r=t.split("/"),i=[];n.val="";for(var o=0,a=r.length;a>o;o++){var s,h=r[o];(s=h.match(/^:([^\/]+)$/))?(i.push(new u(s[1])),e.push(s[1]),n.val+="3"):(s=h.match(/^\*([^\/]+)$/))?(i.push(new l(s[1])),n.val+="2",e.push(s[1])):""===h?(i.push(new p),n.val+="1"):(i.push(new c(h)),n.val+="4")}return n.val=+n.val,i}function d(t){this.charSpec=t,this.nextStates=[]}function v(t){return t.sort(function(t,e){return e.specificity.val-t.specificity.val})}function g(t,e){for(var n=[],r=0,i=t.length;i>r;r++){var o=t[r];n=n.concat(o.match(e))}return n}function y(t){this.queryParams=t||{}}function m(t,e,n){for(var r=t.handlers,i=t.regex,o=e.match(i),a=1,s=new y(n),h=0,c=r.length;c>h;h++){for(var u=r[h],l=u.names,p={},f=0,d=l.length;d>f;f++)p[l[f]]=o[a++];s.push({handler:u.handler,params:p,isDynamic:!!l.length})}return s}function _(t,e){return e.eachChar(function(e){t=t.put(e)}),t}function w(t){return t=t.replace(/\+/gm,"%20"),s(t,!0)}function b(t){"undefined"!=typeof console&&console.error("[vue-router] "+t)}function C(t,e,n){var r=t.match(/(\?.*)$/);if(r&&(r=r[1],t=t.slice(0,-r.length)),"?"===e.charAt(0))return t+e;var i=t.split("/");n&&i[i.length-1]||i.pop();for(var o=e.replace(/^\//,"").split("/"),a=0;a<o.length;a++){var s=o[a];"."!==s&&(".."===s?i.pop():i.push(s))}return""!==i[0]&&i.unshift(""),i.join("/")}function R(t){return t&&"function"==typeof t.then}function A(t,e){var n=t&&(t.$options||t.options);return n&&n.route&&n.route[e]}function k(t,e){Y?Y.$options.components._=t.component:Y={resolve:X.Vue.prototype._resolveComponent,$options:{components:{_:t.component}}},Y.resolve("_",function(n){t.component=n,e(n)})}function $(t,e,n){return void 0===e&&(e={}),t=t.replace(/:([^\/]+)/g,function(n,r){var i=e[r];return i||b('param "'+r+'" not found when generating path for "'+t+'" with params '+JSON.stringify(e)),i||""}),n&&(t+=K(n)),t}function x(t,e,n){var r=t.childVM;if(!r||!e)return!1;if(t.Component!==e.component)return!1;var i=A(r,"canReuse");return"boolean"==typeof i?i:i?i.call(r,{to:n.to,from:n.from}):!0}function E(t,e,n){var r=t.childVM,i=A(r,"canDeactivate");i?e.callHook(i,r,n,{expectBoolean:!0}):n()}function V(t,e,n){k(t,function(t){if(!e.aborted){var r=A(t,"canActivate");r?e.callHook(r,null,n,{expectBoolean:!0}):n()}})}function S(t,e,n){var r=t.childVM,i=A(r,"deactivate");i?e.callHooks(i,r,n):n()}function P(t,e,n,r,i){var o=e.activateQueue[n];if(!o)return H(t),t._bound&&t.setComponent(null),void(r&&r());var a=t.Component=o.component,s=A(a,"activate"),h=A(a,"data"),c=A(a,"waitForData");t.depth=n,t.activated=!1;var u=void 0,l=!(!h||c);if(i=i&&t.childVM&&t.childVM.constructor===a)u=t.childVM,u.$loadingRouteData=l;else if(H(t),t.unbuild(!0),u=t.build({_meta:{$loadingRouteData:l},created:function(){this._routerView=t}}),t.keepAlive){u.$loadingRouteData=l;var p=u._keepAliveRouterView;p&&(t.childView=p,u._keepAliveRouterView=null)}var f=function(){u.$destroy()},d=function(){if(i)return void(r&&r());var n=e.router;n._rendered||n._transitionOnLoad?t.transition(u):(t.setCurrent?t.setCurrent(u):t.childVM=u,u.$before(t.anchor,null,!1)),r&&r()},v=function(){t.childView&&P(t.childView,e,n+1,null,i||t.keepAlive),d()},g=function(){t.activated=!0,h&&c?T(u,e,h,v,f):(h&&T(u,e,h),v())};s?e.callHooks(s,u,g,{cleanup:f,postActivate:!0}):g()}function O(t,e){var n=t.childVM,r=A(n,"data");r&&T(n,e,r)}function T(t,e,n,r,i){t.$loadingRouteData=!0,e.callHooks(n,t,function(){t.$loadingRouteData=!1,t.$emit("route-data-loaded",t),r&&r()},{cleanup:i,postActivate:!0,processData:function(e){var n=[];return j(e)&&Object.keys(e).forEach(function(r){var i=e[r];R(i)?n.push(i.then(function(e){t.$set(r,e)})):t.$set(r,i)}),n.length?n[0].constructor.all(n):void 0}})}function H(t){t.keepAlive&&t.childVM&&t.childView&&(t.childVM._keepAliveRouterView=t.childView),t.childView=null}function j(t){return"[object Object]"===Object.prototype.toString.call(t)}function M(t){return"[object Object]"===Object.prototype.toString.call(t)}function D(t){return t?Array.prototype.slice.call(t):[]}function q(t){var e=t.util,n=e.extend,r=e.isArray,i=e.defineReactive,o=t.prototype._init;t.prototype._init=function(t){t=t||{};var e=t._parent||t.parent||this,n=e.$router,r=e.$route;n&&(this.$router=n,n._children.push(this),this._defineMeta?this._defineMeta("$route",r):i(this,"$route",r)),o.call(this,t)};var a=t.prototype._destroy;t.prototype._destroy=function(){!this._isBeingDestroyed&&this.$router&&this.$router._children.$remove(this),a.apply(this,arguments)};var s=t.config.optionMergeStrategies,h=/^(data|activate|deactivate)$/;s&&(s.route=function(t,e){if(!e)return t;if(!t)return e;var i={};n(i,t);for(var o in e){var a=i[o],s=e[o];a&&h.test(o)?i[o]=(r(a)?a:[a]).concat(s):i[o]=s}return i})}function z(t){var e=t.util,n=t.directive("_component")||t.internalDirectives.component,r=e.extend({},n);e.extend(r,{_isRouterView:!0,bind:function(){var t=this.vm.$route;if(!t)return void b("<router-view> can only be used inside a router-enabled app.");this._isDynamicLiteral=!0,n.bind.call(this);for(var e=void 0,r=this.vm;r;){if(r._routerView){e=r._routerView;break}r=r.$parent}if(e)this.parentView=e,e.childView=this;else{var i=t.router;i._rootView=this}var o=t.router._currentTransition;if(!e&&o.done||e&&e.activated){var a=e?e.depth+1:0;P(this,o,a)}},unbind:function(){this.parentView&&(this.parentView.childView=null),n.unbind.call(this)}}),t.elementDirective("router-view",r)}function Q(t){function e(t){return t.protocol===location.protocol&&t.hostname===location.hostname&&t.port===location.port}function n(t,e,n){if(e=e.trim(),-1===e.indexOf(" "))return void n(t,e);for(var r=e.split(/\s+/),i=0,o=r.length;o>i;i++)n(t,r[i])}var r=t.util,i=r.bind,o=r.isObject,a=r.addClass,s=r.removeClass,h=t.directive("on").priority,c="__vue-router-link-update__",u=0;t.directive("link-active",{priority:9999,bind:function(){for(var t=this,e=String(u++),n=this.el.querySelectorAll("[v-link]"),r=0,i=n.length;i>r;r++){var o=n[r],a=o.getAttribute(c),s=a?a+","+e:e;o.setAttribute(c,s)}this.vm.$on(c,this.cb=function(n,r){n.activeIds.indexOf(e)>-1&&n.updateClasses(r,t.el)})},unbind:function(){this.vm.$off(c,this.cb)}}),t.directive("link",{priority:h-2,bind:function(){var t=this.vm;if(!t.$route)return void b("v-link can only be used inside a router-enabled app.");this.router=t.$route.router,this.unwatch=t.$watch("$route",i(this.onRouteUpdate,this));var e=this.el.getAttribute(c);e&&(this.el.removeAttribute(c),this.activeIds=e.split(",")),"A"===this.el.tagName&&"_blank"===this.el.getAttribute("target")||(this.handler=i(this.onClick,this),this.el.addEventListener("click",this.handler))},update:function(t){this.target=t,o(t)&&(this.append=t.append,this.exact=t.exact,this.prevActiveClass=this.activeClass,this.activeClass=t.activeClass),this.onRouteUpdate(this.vm.$route)},onClick:function(t){if(!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||0!==t.button)){var n=this.target;if(n)t.preventDefault(),this.router.go(n);else{for(var r=t.target;"A"!==r.tagName&&r!==this.el;)r=r.parentNode;if("A"===r.tagName&&e(r)){t.preventDefault();var i=r.pathname;this.router.history.root&&(i=i.replace(this.router.history.rootRE,"")),this.router.go({path:i,replace:n&&n.replace,append:n&&n.append})}}}},onRouteUpdate:function(t){var e=this.router.stringifyPath(this.target);this.path!==e&&(this.path=e,this.updateActiveMatch(),this.updateHref()),this.activeIds?this.vm.$emit(c,this,t.path):this.updateClasses(t.path,this.el)},updateActiveMatch:function(){this.activeRE=this.path&&!this.exact?new RegExp("^"+this.path.replace(/\/$/,"").replace(at,"").replace(ot,"\\$&")+"(\\/|$)"):null},updateHref:function(){if("A"===this.el.tagName){var t=this.path,e=this.router,n="/"===t.charAt(0),r=t&&("hash"===e.mode||n)?e.history.formatPath(t,this.append):t;r?this.el.href=r:this.el.removeAttribute("href")}},updateClasses:function(t,e){var r=this.activeClass||this.router._linkActiveClass;this.prevActiveClass&&this.prevActiveClass!==r&&n(e,this.prevActiveClass,s);var i=this.path.replace(at,"");t=t.replace(at,""),this.exact?i===t||"/"!==i.charAt(i.length-1)&&i===t.replace(it,"")?n(e,r,a):n(e,r,s):this.activeRE&&this.activeRE.test(t)?n(e,r,a):n(e,r,s)},unbind:function(){this.el.removeEventListener("click",this.handler),this.unwatch&&this.unwatch()}})}function F(t,e){var n=e.component;ht.util.isPlainObject(n)&&(n=e.component=ht.extend(n)),"function"!=typeof n&&(e.component=null,b('invalid component for route "'+t+'".'))}var I={};I.classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.prototype={to:function(t,e){var n=this.delegate;if(n&&n.willAddRoute&&(t=n.willAddRoute(this.matcher.target,t)),this.matcher.add(this.path,t),e){if(0===e.length)throw new Error("You must have an argument in the function passed to `to`");this.matcher.addChild(this.path,t,e,this.delegate)}return this}},e.prototype={add:function(t,e){this.routes[t]=e},addChild:function(t,r,i,o){var a=new e(r);this.children[t]=a;var s=n(t,a,o);o&&o.contextEntered&&o.contextEntered(r,s),i(s)}};var U=["/",".","*","+","?","|","(",")","[","]","{","}","\\"],L=new RegExp("(\\"+U.join("|\\")+")","g"),B=!1;c.prototype={eachChar:function(t){for(var e,n=this.string,r=0,i=n.length;i>r;r++)e=n.charAt(r),t({validChars:e})},regex:function(){return this.string.replace(L,"\\$1")},generate:function(){return this.string}},u.prototype={eachChar:function(t){t({invalidChars:"/",repeat:!0})},regex:function(){return"([^/]+)"},generate:function(t){var e=t[this.name];return null==e?":"+this.name:e}},l.prototype={eachChar:function(t){t({invalidChars:"",repeat:!0})},regex:function(){return"(.+)"},generate:function(t){var e=t[this.name];return null==e?":"+this.name:e}},p.prototype={eachChar:function(){},regex:function(){return""},generate:function(){return""}},d.prototype={get:function(t){for(var e=this.nextStates,n=0,r=e.length;r>n;n++){var i=e[n],o=i.charSpec.validChars===t.validChars;if(o=o&&i.charSpec.invalidChars===t.invalidChars)return i}},put:function(t){var e;return(e=this.get(t))?e:(e=new d(t),this.nextStates.push(e),t.repeat&&e.nextStates.push(e),e)},match:function(t){for(var e,n,r,i=this.nextStates,o=[],a=0,s=i.length;s>a;a++)e=i[a],n=e.charSpec,"undefined"!=typeof(r=n.validChars)?-1!==r.indexOf(t)&&o.push(e):"undefined"!=typeof(r=n.invalidChars)&&-1===r.indexOf(t)&&o.push(e);return o}};var N=Object.create||function(t){function e(){}return e.prototype=t,new e};y.prototype=N({splice:Array.prototype.splice,slice:Array.prototype.slice,push:Array.prototype.push,length:0,queryParams:null});var G=function(){this.rootState=new d,this.names={}};G.prototype={add:function(t,e){for(var n,r=this.rootState,i="^",o={},a=[],s=[],h=!0,c=0,u=t.length;u>c;c++){var l=t[c],d=[],v=f(l.path,d,o);s=s.concat(v);for(var g=0,y=v.length;y>g;g++){var m=v[g];m instanceof p||(h=!1,r=r.put({validChars:"/"}),i+="/",r=_(r,m),i+=m.regex())}var w={handler:l.handler,names:d};a.push(w)}h&&(r=r.put({validChars:"/"}),i+="/"),r.handlers=a,r.regex=new RegExp(i+"$"),r.specificity=o,(n=e&&e.as)&&(this.names[n]={segments:s,handlers:a})},handlersFor:function(t){var e=this.names[t],n=[];if(!e)throw new Error("There is no route named "+t);for(var r=0,i=e.handlers.length;i>r;r++)n.push(e.handlers[r]);return n},hasRoute:function(t){return!!this.names[t]},generate:function(t,e){var n=this.names[t],r="";if(!n)throw new Error("There is no route named "+t);for(var i=n.segments,o=0,a=i.length;a>o;o++){var s=i[o];s instanceof p||(r+="/",r+=s.generate(e))}return"/"!==r.charAt(0)&&(r="/"+r),e&&e.queryParams&&(r+=this.generateQueryString(e.queryParams)),r},generateQueryString:function(t){var e=[],n=[];for(var r in t)t.hasOwnProperty(r)&&n.push(r);n.sort();for(var i=0,o=n.length;o>i;i++){r=n[i];var a=t[r];if(null!=a){var s=encodeURIComponent(r);if(h(a))for(var c=0,u=a.length;u>c;c++){var l=r+"[]="+encodeURIComponent(a[c]);e.push(l)}else s+="="+encodeURIComponent(a),e.push(s)}}return 0===e.length?"":"?"+e.join("&")},parseQueryString:function(t){for(var e=t.split("&"),n={},r=0;r<e.length;r++){var i,o=e[r].split("="),a=w(o[0]),s=a.length,h=!1;1===o.length?i="true":(s>2&&"[]"===a.slice(s-2)&&(h=!0,a=a.slice(0,s-2),n[a]||(n[a]=[])),i=o[1]?w(o[1]):""),h?n[a].push(i):n[a]=i}return n},recognize:function(t,e){B=e;var n,r,i,o,a=[this.rootState],h={},c=!1;if(o=t.indexOf("?"),-1!==o){var u=t.substr(o+1,t.length);t=t.substr(0,o),u&&(h=this.parseQueryString(u))}if(t=s(t)){for("/"!==t.charAt(0)&&(t="/"+t),n=t.length,n>1&&"/"===t.charAt(n-1)&&(t=t.substr(0,n-1),c=!0),r=0,i=t.length;i>r&&(a=g(a,t.charAt(r)),a.length);r++);var l=[];for(r=0,i=a.length;i>r;r++)a[r].handlers&&l.push(a[r]);a=v(l);var p=l[0];return p&&p.handlers?(c&&"(.+)$"===p.regex.source.slice(-5)&&(t+="/"),m(p,t,h)):void 0}}},G.prototype.map=o;var K=G.prototype.generateQueryString,X={},Y=void 0,J=/#.*$/,W=function(){function t(e){var n=e.root,r=e.onChange;I.classCallCheck(this,t),n&&"/"!==n?("/"!==n.charAt(0)&&(n="/"+n),this.root=n.replace(/\/$/,""),this.rootRE=new RegExp("^\\"+this.root)):this.root=null,this.onChange=r;var i=document.querySelector("base");this.base=i&&i.getAttribute("href")}return t.prototype.start=function(){var t=this;this.listener=function(e){var n=location.pathname+location.search;t.root&&(n=n.replace(t.rootRE,"")),t.onChange(n,e&&e.state,location.hash)},window.addEventListener("popstate",this.listener),this.listener()},t.prototype.stop=function(){window.removeEventListener("popstate",this.listener)},t.prototype.go=function(t,e,n){var r=this.formatPath(t,n);e?history.replaceState({},"",r):(history.replaceState({pos:{x:window.pageXOffset,y:window.pageYOffset}},"",location.href),history.pushState({},"",r));var i=t.match(J),o=i&&i[0];t=r.replace(J,"").replace(this.rootRE,""),this.onChange(t,null,o)},t.prototype.formatPath=function(t,e){return"/"===t.charAt(0)?this.root?this.root+"/"+t.replace(/^\//,""):t:C(this.base||location.pathname,t,e)},t}(),Z=function(){function t(e){var n=e.hashbang,r=e.onChange;I.classCallCheck(this,t),this.hashbang=n,this.onChange=r}return t.prototype.start=function(){var t=this;this.listener=function(){var e=location.hash,n=e.replace(/^#!?/,"");"/"!==n.charAt(0)&&(n="/"+n);var r=t.formatPath(n);if(r!==e)return void location.replace(r);var i=location.search&&e.indexOf("?")>-1?"&"+location.search.slice(1):location.search;t.onChange(e.replace(/^#!?/,"")+i)},window.addEventListener("hashchange",this.listener),this.listener()},t.prototype.stop=function(){window.removeEventListener("hashchange",this.listener)},t.prototype.go=function(t,e,n){t=this.formatPath(t,n),e?location.replace(t):location.hash=t},t.prototype.formatPath=function(t,e){var n="/"===t.charAt(0),r="#"+(this.hashbang?"!":"");return n?r+t:r+C(location.hash.replace(/^#!?/,""),t,e)},t}(),tt=function(){function t(e){var n=e.onChange;I.classCallCheck(this,t),this.onChange=n,this.currentPath="/"}return t.prototype.start=function(){this.onChange("/")},t.prototype.stop=function(){},t.prototype.go=function(t,e,n){t=this.currentPath=this.formatPath(t,n),this.onChange(t)},t.prototype.formatPath=function(t,e){return"/"===t.charAt(0)?t:C(this.currentPath,t,e)},t}(),et=function(){function t(e,n,r){I.classCallCheck(this,t),this.router=e,this.to=n,this.from=r,this.next=null,this.aborted=!1,this.done=!1}return t.prototype.abort=function(){if(!this.aborted){this.aborted=!0;var t=!this.from.path&&"/"===this.to.path;t||this.router.replace(this.from.path||"/")}},t.prototype.redirect=function(t){this.aborted||(this.aborted=!0,"string"==typeof t?t=$(t,this.to.params,this.to.query):(t.params=t.params||this.to.params,t.query=t.query||this.to.query),this.router.replace(t))},t.prototype.start=function(t){for(var e=this,n=[],r=this.router._rootView;r;)n.unshift(r),r=r.childView;var i=n.slice().reverse(),o=this.activateQueue=D(this.to.matched).map(function(t){return t.handler}),a=void 0,s=void 0;for(a=0;a<i.length&&x(i[a],o[a],e);a++);a>0&&(s=i.slice(0,a),n=i.slice(a).reverse(),o=o.slice(a)),e.runQueue(n,E,function(){e.runQueue(o,V,function(){e.runQueue(n,S,function(){if(e.router._onTransitionValidated(e),s&&s.forEach(function(t){return O(t,e)}),n.length){var r=n[n.length-1],i=s?s.length:0;P(r,e,i,t)}else t()})})})},t.prototype.runQueue=function(t,e,n){function r(o){o>=t.length?n():e(t[o],i,function(){r(o+1)})}var i=this;r(0)},t.prototype.callHook=function(t,e,n){var r=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],i=r.expectBoolean,o=void 0===i?!1:i,a=r.postActivate,s=void 0===a?!1:a,h=r.processData,c=r.cleanup,u=this,l=!1,p=function(){c&&c(),u.abort()},f=function(t){if(s?v():p(),t&&!u.router._suppress)throw b("Uncaught error during transition: "),t instanceof Error?t:new Error(t)},d=function(t){try{f(t)}catch(e){setTimeout(function(){throw e},0)}},v=function(){return l?void b("transition.next() should be called only once."):(l=!0,u.aborted?void(c&&c()):void(n&&n()))},g=function(e){"boolean"==typeof e?e?v():p():R(e)?e.then(function(t){t?v():p()},d):t.length||v()},y=function(t){var e=void 0;try{e=h(t)}catch(n){return f(n)}R(e)?e.then(v,d):v()},m={to:u.to,from:u.from,abort:p,next:h?y:v,redirect:function(){u.redirect.apply(u,arguments)}},_=void 0;try{_=t.call(e,m)}catch(w){return f(w)}o?g(_):R(_)?h?_.then(y,d):_.then(v,d):h&&M(_)?y(_):t.length||v()},t.prototype.callHooks=function(t,e,n,r){var i=this;Array.isArray(t)?this.runQueue(t,function(t,n,o){i.aborted||i.callHook(t,e,o,r)},n):this.callHook(t,e,n,r)},t}(),nt=/^(component|subRoutes|fullPath)$/,rt=function ut(t,e){var n=this;I.classCallCheck(this,ut);var r=e._recognizer.recognize(t);r&&([].forEach.call(r,function(t){for(var e in t.handler)nt.test(e)||(n[e]=t.handler[e])}),this.query=r.queryParams,this.params=[].reduce.call(r,function(t,e){if(e.params)for(var n in e.params)t[n]=e.params[n];return t},{})),this.path=t,this.matched=r||e._notFoundHandler,Object.defineProperty(this,"router",{enumerable:!1,value:e}),Object.freeze(this)},it=/\/$/,ot=/[-.*+?^${}()|[\]\/\\]/g,at=/\?.*$/,st={"abstract":tt,hash:Z,html5:W},ht=void 0,ct=function(){function t(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=n.hashbang,i=void 0===r?!0:r,o=n["abstract"],a=void 0===o?!1:o,s=n.history,h=void 0===s?!1:s,c=n.saveScrollPosition,u=void 0===c?!1:c,l=n.transitionOnLoad,p=void 0===l?!1:l,f=n.suppressTransitionError,d=void 0===f?!1:f,v=n.root,g=void 0===v?null:v,y=n.linkActiveClass,m=void 0===y?"v-link-active":y;if(I.classCallCheck(this,t),!t.installed)throw new Error("Please install the Router with Vue.use() before creating an instance.");this.app=null,this._children=[],this._recognizer=new G,this._guardRecognizer=new G,this._started=!1,this._startCb=null,this._currentRoute={},this._currentTransition=null,this._previousTransition=null,this._notFoundHandler=null,this._notFoundRedirect=null,this._beforeEachHooks=[],this._afterEachHooks=[],this._rendered=!1,this._transitionOnLoad=p,this._root=g,this._abstract=a,this._hashbang=i;var _="undefined"!=typeof window&&window.history&&window.history.pushState;this._history=h&&_,this._historyFallback=h&&!_;var w=ht.util.inBrowser;this.mode=!w||this._abstract?"abstract":this._history?"html5":"hash";var b=st[this.mode];this.history=new b({root:g,hashbang:this._hashbang,onChange:function(t,n,r){e._match(t,n,r)}}),this._saveScrollPosition=u,this._linkActiveClass=m,this._suppress=d}return t.prototype.map=function(t){for(var e in t)this.on(e,t[e]);return this},t.prototype.on=function(t,e){return"*"===t?this._notFound(e):this._addRoute(t,e,[]),this},t.prototype.redirect=function(t){for(var e in t)this._addRedirect(e,t[e]);return this},t.prototype.alias=function(t){for(var e in t)this._addAlias(e,t[e]);return this},t.prototype.beforeEach=function(t){return this._beforeEachHooks.push(t),this},t.prototype.afterEach=function(t){return this._afterEachHooks.push(t),this},t.prototype.go=function(t){var e=!1,n=!1;ht.util.isObject(t)&&(e=t.replace,n=t.append),t=this.stringifyPath(t),t&&this.history.go(t,e,n)},t.prototype.replace=function(t){"string"==typeof t&&(t={path:t}),t.replace=!0,this.go(t)},t.prototype.start=function(t,e,n){if(this._started)return void b("already started.");if(this._started=!0,this._startCb=n,!this.app){if(!t||!e)throw new Error("Must start vue-router with a component and a root container.");if(t instanceof ht)throw new Error("Must start vue-router with a component, not a Vue instance.");this._appContainer=e;var r=this._appConstructor="function"==typeof t?t:ht.extend(t);r.options.name=r.options.name||"RouterApp"}if(this._historyFallback){var i=window.location,o=new W({root:this._root}),a=o.root?i.pathname.replace(o.rootRE,""):i.pathname;if(a&&"/"!==a)return void i.assign((o.root||"")+"/"+this.history.formatPath(a)+i.search)}this.history.start()},t.prototype.stop=function(){this.history.stop(),this._started=!1},t.prototype.stringifyPath=function(t){var e="";if(t&&"object"==typeof t){if(t.name){var n=ht.util.extend,r=this._currentTransition&&this._currentTransition.to.params,i=t.params||{},o=r?n(n({},r),i):i;e=encodeURI(this._recognizer.generate(t.name,o))}else t.path&&(e=encodeURI(t.path));if(t.query){var a=this._recognizer.generateQueryString(t.query);e+=e.indexOf("?")>-1?"&"+a.slice(1):a}}else e=encodeURI(t?t+"":"");return e},t.prototype._addRoute=function(t,e,n){if(F(t,e),e.path=t,e.fullPath=(n.reduce(function(t,e){return t+e.path},"")+t).replace("//","/"),n.push({path:t,handler:e}),this._recognizer.add(n,{as:e.name}),e.subRoutes)for(var r in e.subRoutes)this._addRoute(r,e.subRoutes[r],n.slice())},t.prototype._notFound=function(t){F("*",t),this._notFoundHandler=[{handler:t}]},t.prototype._addRedirect=function(t,e){"*"===t?this._notFoundRedirect=e:this._addGuard(t,e,this.replace)},t.prototype._addAlias=function(t,e){this._addGuard(t,e,this._match)},t.prototype._addGuard=function(t,e,n){var r=this;this._guardRecognizer.add([{path:t,handler:function(t,i){var o=$(e,t.params,i);n.call(r,o)}}])},t.prototype._checkGuard=function(t){var e=this._guardRecognizer.recognize(t,!0);return e?(e[0].handler(e[0],e.queryParams),!0):this._notFoundRedirect&&(e=this._recognizer.recognize(t),!e)?(this.replace(this._notFoundRedirect),!0):void 0},t.prototype._match=function(t,e,n){var r=this;if(!this._checkGuard(t)){var i=this._currentRoute,o=this._currentTransition;if(o){if(o.to.path===t)return;if(i.path===t)return o.aborted=!0,void(this._currentTransition=this._prevTransition);o.aborted=!0}var a=new rt(t,this),s=new et(this,a,i);this._prevTransition=o,this._currentTransition=s,this.app||!function(){var t=r;r.app=new r._appConstructor({el:r._appContainer,created:function(){this.$router=t},_meta:{$route:a}})}();var h=this._beforeEachHooks,c=function(){s.start(function(){r._postTransition(a,e,n)})};h.length?s.runQueue(h,function(t,e,n){s===r._currentTransition&&s.callHook(t,null,n,{expectBoolean:!0})},c):c(),!this._rendered&&this._startCb&&this._startCb.call(null),this._rendered=!0}},t.prototype._onTransitionValidated=function(t){var e=this._currentRoute=t.to;this.app.$route!==e&&(this.app.$route=e,this._children.forEach(function(t){t.$route=e})),this._afterEachHooks.length&&this._afterEachHooks.forEach(function(e){return e.call(null,{to:t.to,from:t.from})}),this._currentTransition.done=!0},t.prototype._postTransition=function(t,e,n){var r=e&&e.pos;r&&this._saveScrollPosition?ht.nextTick(function(){window.scrollTo(r.x,r.y)}):n&&ht.nextTick(function(){var t=document.getElementById(n.slice(1));t&&window.scrollTo(window.scrollX,t.offsetTop)})},t}();return ct.installed=!1,ct.install=function(t){return ct.installed?void b("already installed."):(ht=t,q(ht),z(ht),Q(ht),X.Vue=ht,void(ct.installed=!0))},"undefined"!=typeof window&&window.Vue&&window.Vue.use(ct),ct});
