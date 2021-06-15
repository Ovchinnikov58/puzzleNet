import React, { FC, ReactNode } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

import './Layout.scss'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = (props: LayoutProps): JSX.Element => {
  const { children } = props
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
