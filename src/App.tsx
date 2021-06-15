import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Home from './pages/home/Home'
import Chat from './pages/chat/Chat'
import NotFound from './pages/notFound/NotFound'
import Layout from './layout/Layout'
import Sider from './components/sider/Sider'
import './styles/App.scss'

const App: FC = (): JSX.Element => {
  return (
    <div className="App">
      <Layout>
        <Container maxWidth="xl">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/chat" component={Chat} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Sider />
      </Layout>
    </div>
  )
}

export default App
