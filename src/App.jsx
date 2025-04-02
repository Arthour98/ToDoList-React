import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { NAV } from './Navigation';
import Register from './pages/Register';
import Logout from './pages/Logout';
import TaskManager from './pages/TaskManager';
import Login from './pages/Login.Jsx';
function App() {


  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<NAV />}>
          <Route index element={<TaskManager />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login/>} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
