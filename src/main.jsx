import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CookieConsentProvider } from './contexts/CookieConsentContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
