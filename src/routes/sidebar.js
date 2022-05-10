/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/Home', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Home', // name that appear in Sidebar
  },  {
    path: '/app/notices', // the url
    icon: 'FormsIcon', // the component being exported from icons/index.js
    name: 'Notices', // name that appear in Sidebar
  }, {
    path: '/app/bookmarks', // the url
    icon: 'CardsIcon', // the component being exported from icons/index.js
    name: 'Bookmarks', // name that appear in Sidebar
  }, {
    path: '/app/download', // the url
    icon: 'GithubIcon', // the component being exported from icons/index.js
    name: 'Download', // name that appear in Sidebar
  }, {
    path: '/app/toppers', // the url
    icon: 'SmileIcon', // the component being exported from icons/index.js
    name: 'Toppers', // name that appear in Sidebar
  }, {
    path: '/app/school', // the url
    icon: 'PeopleIcon', // the component being exported from icons/index.js
    name: 'My School', // name that appear in Sidebar
  }, {
    path: '/app/settings', // the url
    icon: 'MenuIcon', // the component being exported from icons/index.js
    name: 'Settings', // name that appear in Sidebar
  }
  // }, {
  //   path: '/app/dashboard', // the url
  //   icon: 'HomeIcon', // the component being exported from icons/index.js
  //   name: 'Dashboard', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },  
  // {
  //   path: '/logout',
  //   icon: 'TablesIcon',
  //   name: 'Logout',
  // },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export default routes
