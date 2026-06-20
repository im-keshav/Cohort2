import React from 'react'
import AppRouter from './AppRoutes'
import "./style.scss"
import { AuthProvider } from './feature/auth/auth.context' 

const App = () => {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App  