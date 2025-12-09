import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
