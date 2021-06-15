import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './store/reducers/rootReducer'
import { sagaWatcher } from './store/sagas'
import App from './App'
import './styles/index.css'

const saga = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saga)))

saga.run(sagaWatcher)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
