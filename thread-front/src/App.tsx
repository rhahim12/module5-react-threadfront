import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css' 
import { NavBar } from './components/NavBar.js'

import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profile from './components/Profil.js'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profil" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
