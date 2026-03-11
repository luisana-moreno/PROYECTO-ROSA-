import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
<<<<<<< HEAD

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
=======
import './global.css'

import App from './App'
import store from './store'
import { AuthProvider } from './context/AuthContext' // Importa AuthProvider

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      {' '}
      {/* Envuelve App con AuthProvider */}
      <App />
    </AuthProvider>
>>>>>>> master
  </Provider>,
)
