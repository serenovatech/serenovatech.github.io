import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { USE_HASH_ROUTER } from './config/site'

// Links shared while the site used hash routing (…/#/about) still work: turn
// them into the real page URL. On first load this happens before the router
// starts; if one is opened later in the same tab, load the real page instead.
if (!USE_HASH_ROUTER) {
  const hashRouteUrl = () =>
    window.location.hash.startsWith('#/') ? `${import.meta.env.BASE_URL}${window.location.hash.slice(2)}` : null

  const initial = hashRouteUrl()
  if (initial) window.history.replaceState(null, '', initial)

  window.addEventListener('hashchange', () => {
    const url = hashRouteUrl()
    if (url) window.location.replace(url)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
