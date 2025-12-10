import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NavBar } from './components/NavBar.js'
import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profil from './components/Profil.js'
import Login from './components/Login.js'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profil" element={<Profil />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <NavBar/>
    </>
  )
}

export default App
