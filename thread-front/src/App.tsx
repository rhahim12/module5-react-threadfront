import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Comment from './components/Comment.js'

import { NavBar } from './components/NavBar.js'
import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profil from './components/Profil.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Create from './components/Createpost.js'
import Lougout from './components/Logout.js'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profil" element={<Profil />} />
          <Route path="login" element={<Login />} />
          <Route path="comment" element={<Comment />} />
          <Route path="register" element={<Register />} />
          <Route path="Createpost" element={<Create />} />
          <Route path="Logout" element={<Lougout />} />
        </Routes>
      </BrowserRouter>
      <NavBar/>
    </>
  )
}

export default App
