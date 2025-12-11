import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Comment from './components/Comment.js'
import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profile from './components/Profil.js'
import Login from './components/Login.js'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profil" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="comment" element={<Comment />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
