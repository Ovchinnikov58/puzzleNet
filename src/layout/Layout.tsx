import React, { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

import './Layout.scss'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = (props: LayoutProps): JSX.Element => {
  const location = useLocation()
  const { children } = props

  return (
    <div className="layout">
      {location.pathname !== '/auth' ? <Header /> : null}
      <div className="content">{children}</div>
      {location.pathname !== '/auth' ? <Footer /> : null}
    </div>
  )
}

export default Layout
