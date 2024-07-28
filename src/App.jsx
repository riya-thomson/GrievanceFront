import React from 'react'
import Home from './components/Hero/Home'
import Login from './components/Login/Login'
import Form from './components/Form/Form'
import Signup from './components/Login/Signup'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'

const App = () => {
  return (
    <div>
     
      {/* <Home/>
      <Login/>
      <Form/>  */}
          <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </AuthProvider>

    </div>
  )
}

export default App



