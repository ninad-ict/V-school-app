/*! For license information please see 12.39bb2935.chunk.js.LICENSE.txt */
(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[12],{1112:function(e,t,a){"use strict";var l=a(0),r=a.n(l),n=a(8);t.a=function(e){var t=e.title,a=e.value,l=e.children,c=e.handleClick;return r.a.createElement(n.Card,{onClick:c},r.a.createElement(n.CardBody,{className:"flex items-center hover:bg-purple-400 hover:text-gray-50 "},l,r.a.createElement("div",null,r.a.createElement("p",{className:"mb-2 text-sm font-medium text-gray-600"},t),r.a.createElement("p",{className:"text-lg font-semibold text-gray-700 dark:text-gray-200"},a))))}},1113:function(e,t,a){"use strict";var l=a(0),r=a.n(l),n=a(1114),c=a.n(n);t.a=function(e){var t=e.icon,a=e.iconColorClass,l=void 0===a?"text-purple-600 dark:text-purple-100":a,n=e.bgColorClass,s=void 0===n?"bg-purple-100 dark:bg-purple-600":n,o=e.className,i=c()("p-3 rounded-full",l,s,o);return r.a.createElement("div",{className:i},r.a.createElement(t,{className:"w-5 h-5"}))}},1114:function(e,t,a){var l;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var n=typeof l;if("string"===n||"number"===n)e.push(l);else if(Array.isArray(l)&&l.length){var c=r.apply(null,l);c&&e.push(c)}else if("object"===n)for(var s in l)a.call(l,s)&&l[s]&&e.push(s)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()},1254:function(e,t,a){"use strict";a.r(t);var l=a(4),r=a(0),n=a.n(r),c=a(1),s=a(14),o=a.n(s),i=a(23),m=a(8),u=a(1112),f=a(1113),d=(a(41),a(10));a(18);t.default=function(e){Object(c.g)();var t=Object(r.useContext)(d.a),a=Object(r.useState)(""),s=Object(l.a)(a,2),g=s[0],p=(s[1],Object(r.useState)((function(){return localStorage.getItem("students")?(console.log(localStorage.getItem("students")),JSON.parse(localStorage.getItem("students"))):""}))),h=Object(l.a)(p,2),v=h[0];return h[1],e.checkProfile,Object(r.useEffect)((function(){console.log(JSON.stringify(v)),console.log(JSON.stringify(v[0]))}),[v]),Object(r.useEffect)((function(){g&&localStorage.setItem("profile",g)}),[t.profile]),n.a.createElement("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900"},n.a.createElement("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"},n.a.createElement("div",{className:"flex flex-col overflow-y-auto md:flex-row"},n.a.createElement("div",{className:"h-32 md:h-auto md:w-1/2 "},n.a.createElement("img",{"aria-hidden":"true",className:"object-cover w-full h-full dark:hidden",src:o.a,alt:"Office"}),n.a.createElement("img",{"aria-hidden":"true",className:"hidden object-cover w-full h-full dark:block",src:o.a,alt:"Office"})),n.a.createElement("main",{className:"flex items-center justify-center p-6 sm:p-12 md:w-1/2"},n.a.createElement("div",{className:"w-full"},n.a.createElement("h1",{className:"mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"},"Who is Studying?"),n.a.createElement("div",{className:"flex flex-wrap mt-10"},n.a.createElement("div",{className:"w-full lg:w-12/12 pr-4 font-light"},n.a.createElement(m.Label,null,n.a.createElement("span",null,"Select Profile")))),n.a.createElement("div",{className:"flex flex-wrap mt-10"},v.map((function(e,a){return n.a.createElement("div",{className:"w-full lg:w-12/12 pr-4 font-light"},n.a.createElement(u.a,{title:"Student",value:e.first_name+" "+e.last_name,handleClick:function(a){return t.changeProfile(JSON.stringify(e))}},n.a.createElement(f.a,{icon:i.SmileIcon,className:"mr-4 hover:bg-sky-200"})))}))),n.a.createElement("div",{className:"flex flex-wrap mt-10 float-right"},n.a.createElement(m.Button,{onClick:function(){localStorage.setItem("login",!1),localStorage.setItem("profile",""),t.changeLogin(!1),t.changeProfile("")}},n.a.createElement(i.OutlineLogoutIcon,{className:"w-5 h-5","aria-hidden":"true"}),"logout")))))))}}}]);
//# sourceMappingURL=12.39bb2935.chunk.js.map