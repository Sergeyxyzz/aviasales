import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './index.module.scss'
import App from './components/app/App'
import { Provider } from 'react-redux'
import store from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Provider store={store}>
      <div className={styles.wrapApp}>
        <App />
      </div>
    </Provider>
  </StrictMode>,
)
