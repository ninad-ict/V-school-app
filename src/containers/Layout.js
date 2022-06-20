import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'
import Background from "../assets/img/BackGround-1.png";

const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])

  return (
    <div
      className={` setBackground-Content setBackground bg-gray-50 flex h-screen dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
      // style={{backgroundImage: `url("${Background}")`,backgroundColor: 'rgba(232, 70, 70)',zIndex:-1}}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Redirect exact from="/logout" to="/login" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
      
    </div>
  )
}

export default Layout
