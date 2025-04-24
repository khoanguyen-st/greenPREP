import RouteProvider from '@app/providers/RouteProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { Provider } from 'react-redux'

import store from './providers/store'

const queryClient = new QueryClient()

const hasCurrentSkill = localStorage.getItem('current_skill') !== null

if (!hasCurrentSkill && window.location.pathname !== '/') {
  window.location.href = '/'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <RouteProvider />
      </Suspense>
    </QueryClientProvider>
  </Provider>
)
