/*! For license information please see 7.73418676.chunk.js.LICENSE.txt */
(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[7],{1063:function(e,a,t){"use strict";var r=t(0),l=t.n(r);a.a=function(e){var a=e.children;return l.a.createElement("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"},a)}},1064:function(e,a,t){"use strict";var r=t(0),l=t.n(r);t(7);a.a=function(e){var a=e.text,t=e.showMore||"hidden",r=e.bgColor||"bg-purple-600",n=e.handleClick,c=e.ref,o="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 ".concat(r," rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple");return l.a.createElement("p",{className:o,href:"https://github.com/estevanmaito/windmill-dashboard-react"},l.a.createElement("div",{className:"flex items-center",ref:c},l.a.createElement("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})),l.a.createElement("span",null,a)),l.a.createElement("a",{className:t,href:"#",onClick:n},t," ",l.a.createElement("span",{dangerouslySetInnerHTML:{__html:"&LeftArrow;"}})))}},1067:function(e,a,t){"use strict";var r=t(0),l=t.n(r);a.a=function(e){var a=e.children;return l.a.createElement("h2",{className:"mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"},a)}},1068:function(e,a,t){"use strict";var r=t(0),l=t.n(r),n=t(7);a.a=function(e){var a=e.title,t=e.value,r=e.children,c=e.handleClick;return l.a.createElement(n.Card,{onClick:c},l.a.createElement(n.CardBody,{className:"flex items-center hover:bg-purple-400 hover:text-gray-50"},r,l.a.createElement("div",null,l.a.createElement("p",{className:"mb-2 text-sm font-medium text-gray-600"},a),l.a.createElement("p",{className:"text-lg font-semibold text-gray-700 dark:text-gray-200"},t))))}},1069:function(e,a,t){"use strict";var r=t(0),l=t.n(r),n=t(1070),c=t.n(n);a.a=function(e){var a=e.icon,t=e.iconColorClass,r=void 0===t?"text-purple-600 dark:text-purple-100":t,n=e.bgColorClass,o=void 0===n?"bg-purple-100 dark:bg-purple-600":n,s=e.className,m=c()("p-3 rounded-full",r,o,s);return l.a.createElement("div",{className:m},l.a.createElement(a,{className:"w-5 h-5"}))}},1070:function(e,a,t){var r;!function(){"use strict";var t={}.hasOwnProperty;function l(){for(var e=[],a=0;a<arguments.length;a++){var r=arguments[a];if(r){var n=typeof r;if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var c=l.apply(null,r);c&&e.push(c)}else if("object"===n)for(var o in r)t.call(r,o)&&r[o]&&e.push(o)}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(r=function(){return l}.apply(a,[]))||(e.exports=r)}()},1215:function(e,a,t){"use strict";t.r(a);var r=t(0),l=t.n(r),n=t(1063),c=t(1067),o=t(1064),s=t(1068),m=t(7),i=t(17),u=t(1069);a.default=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(n.a,null,"Cards"),l.a.createElement(o.a,null),l.a.createElement(c.a,null,"Big section cards"),l.a.createElement(m.Card,{className:"mb-8 shadow-md"},l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"text-sm text-gray-600 dark:text-gray-400"},"Large, full width sections goes here"))),l.a.createElement(c.a,null,"Responsive cards"),l.a.createElement("div",{className:"grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4"},l.a.createElement(s.a,{title:"Total clients",value:"6389"},l.a.createElement(u.a,{icon:i.PeopleIcon,iconColorClass:"text-orange-500 dark:text-orange-100",bgColorClass:"bg-orange-100 dark:bg-orange-500",className:"mr-4"})),l.a.createElement(s.a,{title:"Account balance",value:"$ 46,760.89"},l.a.createElement(u.a,{icon:i.MoneyIcon,iconColorClass:"text-green-500 dark:text-green-100",bgColorClass:"bg-green-100 dark:bg-green-500",className:"mr-4"})),l.a.createElement(s.a,{title:"New sales",value:"376"},l.a.createElement(u.a,{icon:i.CartIcon,iconColorClass:"text-blue-500 dark:text-blue-100",bgColorClass:"bg-blue-100 dark:bg-blue-500",className:"mr-4"})),l.a.createElement(s.a,{title:"Pending contacts",value:"35"},l.a.createElement(u.a,{icon:i.ChatIcon,iconColorClass:"text-teal-500 dark:text-teal-100",bgColorClass:"bg-teal-100 dark:bg-teal-500",className:"mr-4"}))),l.a.createElement(c.a,null,"Cards with title"),l.a.createElement("div",{className:"grid gap-6 mb-8 md:grid-cols-2"},l.a.createElement(m.Card,null,l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"mb-4 font-semibold text-gray-600 dark:text-gray-300"},"Revenue"),l.a.createElement("p",{className:"text-gray-600 dark:text-gray-400"},"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet ratione! Ratione, nihil dolorum."))),l.a.createElement(m.Card,{colored:!0,className:"text-white bg-purple-600"},l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"mb-4 font-semibold"},"Colored card"),l.a.createElement("p",null,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet ratione! Ratione, nihil dolorum.")))))}}}]);
//# sourceMappingURL=7.73418676.chunk.js.map