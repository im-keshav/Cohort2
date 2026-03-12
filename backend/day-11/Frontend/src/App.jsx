import React from 'react'
import AppRouters from './AppRoutes'
import "./style.scss"
import { AuthProvider } from './features/auth/auth.context.jsx'

function App() {
  return (
    <AuthProvider>

      <AppRouters/>
    </AuthProvider>
  )
}

export default App
