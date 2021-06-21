import React, { FC, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import { Container } from '@material-ui/core'
import Home from './pages/home/Home'
import Chat from './pages/chat/Chat'
import Auth from './pages/auth/Auth'
import NotFound from './pages/notFound/NotFound'
import Layout from './layout/Layout'
import Sider from './components/sider/Sider'

import { AppState, AuthState, RootState } from './utils/types'
import { changeTheme, fetchUser } from './store/actions'
import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css'

const App: FC = (): JSX.Element => {
  const { isAuth } = useSelector((s: RootState): AuthState => s.auth)
  const { darkTheme } = useSelector((s: RootState): AppState => s.app)

  const history = useHistory()
  const location = useLocation()
  const dsp = useDispatch()

  useEffect(checkLocalStorage, [])

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      dsp(changeTheme())
    }
  }, [])

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
    }
  }, [darkTheme])

  return (
    <div className="App">
      <Layout>
        <Container maxWidth="xl">
          <ToastContainer />
          <Switch>
            <Route path="/auth" render={() => (isAuth ? <Redirect to="/" /> : <Auth />)} />
            <Route path="/" exact render={() => (!isAuth ? <Redirect to="/auth" /> : <Home />)} />
            <Route
              path="/chat"
              render={() => (!isAuth && !localStorage.getItem('user') ? <Redirect to="/auth" /> : <Chat />)}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Sider />
      </Layout>
    </div>
  )

  function checkLocalStorage() {
    const localStorageValues = {
      login: localStorage.getItem('user'),
      password: localStorage.getItem('password'),
      history,
      location: location.pathname,
    }
    if (localStorageValues.login) {
      dsp(fetchUser(localStorageValues))
    }
  }
}

export default App
