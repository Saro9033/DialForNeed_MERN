import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {Store} from './Store.jsx'
import {  SidebarProvider } from './context/SidebarContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SidebarProvider>
    <Provider store={Store}> 
    <SnackbarProvider maxSnack={3}>
      <App />
      </SnackbarProvider>
      </Provider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
)
