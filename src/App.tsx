import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import Home from './pages/home/Home'
import Chat from './pages/chat/Chat'
import Auth from './pages/auth/Auth'
import NotFound from './pages/notFound/NotFound'
import Layout from './layout/Layout'
import Sider from './components/sider/Sider'
import { AuthState, RootState } from './utils/types'
import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css'

const App: FC = (): JSX.Element => {
  const { isAuth } = useSelector((s: RootState): AuthState => s.auth)
  return (
    <div className="App">
      <Layout>
        <Container maxWidth="xl">
          <ToastContainer />
          <Switch>
            <Route path="/auth" render={() => (isAuth ? <Redirect to="/" /> : <Auth />)} />
            <Route path="/" exact render={() => (!isAuth ? <Redirect to="/auth" /> : <Home />)} />
            <Route path="/chat" render={() => (!isAuth ? <Redirect to="/auth" /> : <Chat />)} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Sider />
      </Layout>
    </div>
  )
}

export default App
