(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[17],{1265:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(1),o=[{path:"/dashboard",component:Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,1256))}))},{path:"/Home",component:Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,1266))}))},{path:"/forms",component:Object(n.lazy)((function(){return t.e(11).then(t.bind(null,1258))}))},{path:"/cards",component:Object(n.lazy)((function(){return t.e(7).then(t.bind(null,1259))}))},{path:"/charts",component:Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,1260))}))},{path:"/buttons",component:Object(n.lazy)((function(){return t.e(10).then(t.bind(null,1261))}))},{path:"/modals",component:Object(n.lazy)((function(){return t.e(13).then(t.bind(null,1262))}))},{path:"/tables",component:Object(n.lazy)((function(){return t.e(8).then(t.bind(null,1263))}))},{path:"/404",component:Object(n.lazy)((function(){return t.e(3).then(t.bind(null,1257))}))},{path:"/blank",component:Object(n.lazy)((function(){return t.e(16).then(t.bind(null,1264))}))}];function c(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=[{path:"/app/Home",icon:"HomeIcon",name:"Home"},{path:"/app/notices",icon:"FormsIcon",name:"Notices"},{path:"/app/bookmarks",icon:"CardsIcon",name:"Bookmarks"},{path:"/app/download",icon:"GithubIcon",name:"Download"},{path:"/app/toppers",icon:"SmileIcon",name:"Toppers"},{path:"/app/school",icon:"PeopleIcon",name:"My School"},{path:"/app/settings",icon:"MenuIcon",name:"Settings"},{path:"/app/s",icon:"OutlineLogoutIcon",name:"Logout"}],s=t(13),m=t(23),u=t(4),d=t(8),p=["icon"];function h(e){var a=e.icon,t=c(e,p),n=m[a];return r.a.createElement(n,t)}var f=function(e){var a=e.route,t=Object(n.useState)(!1),l=Object(u.a)(t,2),o=l[0],c=l[1];return r.a.createElement("li",{className:"relative px-6 py-3",key:a.name},r.a.createElement("button",{className:"inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",onClick:function(){c(!o)},"aria-haspopup":"true"},r.a.createElement("span",{className:"inline-flex items-center"},r.a.createElement(h,{className:"w-5 h-5","aria-hidden":"true",icon:a.icon}),r.a.createElement("span",{className:"ml-4"},a.name)),r.a.createElement(m.DropdownIcon,{className:"w-4 h-4","aria-hidden":"true"})),r.a.createElement(d.Transition,{show:o,enter:"transition-all ease-in-out duration-300",enterFrom:"opacity-25 max-h-0",enterTo:"opacity-100 max-h-xl",leave:"transition-all ease-in-out duration-300",leaveFrom:"opacity-100 max-h-xl",leaveTo:"opacity-0 max-h-0"},r.a.createElement("ul",{className:"p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900","aria-label":"submenu"},a.routes.map((function(e){return r.a.createElement("li",{className:"px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",key:e.name},r.a.createElement(s.b,{className:"w-full",to:e.path},e.name))})))))},b=["icon"];function g(e){var a=e.icon,t=c(e,b),n=m[a];return r.a.createElement(n,t)}function E(){localStorage.setItem("login",!1),localStorage.setItem("profile",""),window.location.reload()}var y=function(){return r.a.createElement("div",{className:"py-4 text-gray-500 dark:text-gray-400"},r.a.createElement("a",{className:"ml-6 text-lg font-bold text-gray-800 dark:text-gray-200",href:"#"},"VOPA"),r.a.createElement("ul",{className:"mt-6"},i.map((function(e){return e.routes?r.a.createElement(f,{route:e,key:e.name}):r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"relative px-6 py-3",key:e.name},r.a.createElement(s.c,{exact:!0,to:e.path,className:"inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ".concat("Logout"==e.name?"text-purple-400":""),activeClassName:"text-gray-800 dark:text-gray-100",onClick:"Logout"==e.name?E:""},r.a.createElement(l.b,{path:e.path,exact:e.exact},r.a.createElement("span",{className:"absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg","aria-hidden":"true"})),r.a.createElement(g,{className:"w-5 h-5","aria-hidden":"true",icon:e.icon}),r.a.createElement("span",{className:"ml-4"},e.name))))}))),r.a.createElement("div",{className:"px-6 my-6 hidden"},r.a.createElement(d.Button,null,"Create account",r.a.createElement("span",{className:"ml-2","aria-hidden":"true"},"+"))))};var x=function(e){return r.a.createElement("aside",{className:"z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block"},r.a.createElement(y,null))},w=t(24);var v=function(){var e=Object(n.useContext)(w.a),a=e.isSidebarOpen,t=e.closeSidebar;return r.a.createElement(d.Transition,{show:a},r.a.createElement(r.a.Fragment,null,r.a.createElement(d.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},r.a.createElement(d.Backdrop,{onClick:t})),r.a.createElement(d.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0 transform -translate-x-20",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0 transform -translate-x-20"},r.a.createElement("aside",{className:"fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden"},r.a.createElement(y,null)))))};var N=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,null),r.a.createElement(v,null))},k=t(10),O=["Main Syllabus","Special Courses","Total Usage"];var j=function(){var e=Object(n.useContext)(d.WindmillContext),a=e.mode,t=e.toggleMode,l=Object(n.useContext)(w.a).toggleSidebar,o=Object(n.useState)(!1),c=Object(u.a)(o,2),i=c[0],s=c[1],p=Object(n.useState)(!1),h=Object(u.a)(p,2),f=h[0],b=h[1],g=Object(n.useState)(!1),E=Object(u.a)(g,2),y=E[0],x=E[1],v=Object(n.useState)(O[0]),N=Object(u.a)(v,2),j=N[0],I=N[1];return Object(n.useContext)(k.a).changeSection(j),r.a.createElement("header",{className:"z-40 py-4 bg-white shadow-bottom dark:bg-gray-800"},r.a.createElement("div",{className:"container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300 "},r.a.createElement("button",{className:"p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple",onClick:l,"aria-label":"Menu"},r.a.createElement(m.MenuIcon,{className:"w-6 h-6","aria-hidden":"true"})),r.a.createElement("div",{className:"flex flex-1 lg:mr-2"},r.a.createElement("div",{className:"relative w-full max-w-xl focus-within:text-purple-500 mx-auto"},r.a.createElement("div",{className:"inset-y-0 flex items-center pl-2"},r.a.createElement("div",{className:"relative mx-auto"},r.a.createElement(d.Button,{layout:"outline",onClick:function(){x(!y)},"aria-label":"Notifications","aria-haspopup":"true",className:"px-10 lg:px-20 mx-auto",iconRight:m.DownIcon},j),r.a.createElement(d.Dropdown,{isOpen:y,onClose:function(){return x(!1)},value:j},O.map((function(e,a){return r.a.createElement(d.DropdownItem,{className:"justify-between",onClick:function(e){return I(e.target.innerText),x(!1)}},e)}))))))),r.a.createElement("ul",{className:"flex items-center flex-shrink-0 space-x-6"},r.a.createElement("li",{className:"flex"},r.a.createElement("button",{className:"rounded-md focus:outline-none focus:shadow-outline-purple",onClick:t,"aria-label":"Toggle color mode"},"dark"===a?r.a.createElement(m.SunIcon,{className:"w-5 h-5","aria-hidden":"true"}):r.a.createElement(m.MoonIcon,{className:"w-5 h-5","aria-hidden":"true"}))),r.a.createElement("li",{className:"relative"},r.a.createElement("button",{className:"relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple",onClick:function(){s(!i)},"aria-label":"Notifications","aria-haspopup":"true"},r.a.createElement(m.BellIcon,{className:"w-5 h-5","aria-hidden":"true"}),r.a.createElement("span",{"aria-hidden":"true",className:"absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"})),r.a.createElement(d.Dropdown,{align:"right",isOpen:i,onClose:function(){return s(!1)}},r.a.createElement(d.DropdownItem,{tag:"a",href:"#",className:"justify-between"},r.a.createElement("span",null,"Messages"),r.a.createElement(d.Badge,{type:"danger"},"133")),r.a.createElement(d.DropdownItem,{tag:"a",href:"#",className:"justify-between"},r.a.createElement("span",null,"Sales"),r.a.createElement(d.Badge,{type:"danger"},"2")),r.a.createElement(d.DropdownItem,{onClick:function(){return alert("Alerts!")}},r.a.createElement("span",null,"Alerts")))),r.a.createElement("li",{className:"relative"},r.a.createElement("button",{className:"rounded-full focus:shadow-outline-purple focus:outline-none",onClick:function(){b(!f)},"aria-label":"Account","aria-haspopup":"true"},r.a.createElement(d.Avatar,{className:"align-middle",src:"https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82",alt:"","aria-hidden":"true"})),r.a.createElement(d.Dropdown,{align:"right",isOpen:f,onClose:function(){return b(!1)}},r.a.createElement(d.DropdownItem,{tag:"a",href:"#"},r.a.createElement(m.OutlinePersonIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),r.a.createElement("span",null,"Profile")),r.a.createElement(d.DropdownItem,{tag:"a",href:"#"},r.a.createElement(m.OutlineCogIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),r.a.createElement("span",null,"Settings")),r.a.createElement(d.DropdownItem,{onClick:function(){localStorage.setItem("login",!1),localStorage.setItem("profile",""),window.location.reload()}},r.a.createElement(m.OutlineLogoutIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),r.a.createElement("span",null,"Log out")))))))};var I=function(e){var a=e.children;return r.a.createElement("main",{className:"h-full overflow-y-auto"},r.a.createElement("div",{className:"container grid px-6 mx-auto"},a))},S=t(37),C=Object(n.lazy)((function(){return t.e(3).then(t.bind(null,1257))}));a.default=function(){var e=Object(n.useContext)(w.a),a=e.isSidebarOpen,t=e.closeSidebar,c=Object(l.h)();return Object(n.useEffect)((function(){t()}),[c]),r.a.createElement("div",{className:"flex h-screen bg-gray-50 dark:bg-gray-900 ".concat(a&&"overflow-hidden")},r.a.createElement(N,null),r.a.createElement("div",{className:"flex flex-col flex-1 w-full"},r.a.createElement(j,null),r.a.createElement(I,null,r.a.createElement(n.Suspense,{fallback:r.a.createElement(S.a,null)},r.a.createElement(l.d,null,o.map((function(e,a){return e.component?r.a.createElement(l.b,{key:a,exact:!0,path:"/app".concat(e.path),render:function(a){return r.a.createElement(e.component,a)}}):null})),r.a.createElement(l.a,{exact:!0,from:"/app",to:"/app/dashboard"}),r.a.createElement(l.a,{exact:!0,from:"/logout",to:"/login"}),r.a.createElement(l.b,{component:C}))))))}}}]);
//# sourceMappingURL=17.7dd08b43.chunk.js.map