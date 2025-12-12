import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { NavBar } from './components/NavBar.js'
import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profil from './components/Profil.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { Comment } from './components/Comment.js'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profil" element={<Profil />} />
          <Route path="login" element={<Login />} />
          <Route path="comment" element={<Comment userName='@BillyJoeArmstrong' commentText="Haha trop drôle !" commentDate="15:25 13 août 25"/>} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <NavBar/>
    </>
  )
}

export default App
