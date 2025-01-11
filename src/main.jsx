import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import AppState from './context/AppState.jsx'

createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>,
)
