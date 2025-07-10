import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
// import appStore from './Store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './Store/store.js'
// import {store, persistor} from './Store/store.js';
// import { store } from './Store/store.js'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
   </Provider>

  </StrictMode>
)
