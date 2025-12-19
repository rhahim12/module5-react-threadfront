import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { NavBar } from './components/NavBar.js'
import HomePage from './components/HomePage.jsx'
import Feed from './components/Feed.js'
import Profil from './components/Profil.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Create from './components/Createpost.js'
import Lougout from './components/Logout.js'
import PrivateRoutes from './utils/PrivateRoute.tsx'

import { Comment } from './components/Comment.js'
import { PostDetail } from './components/PostDetail.js'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element ={<PrivateRoutes/>}>
          <Route path="/" element={<Feed />} />
          <Route element={<Feed />} path='/feed' />
          <Route path="profil" element={<Profil />} />
          <Route path="comment" element={<Comment />} />
          <Route path="Createpost" element={<Create />} />
          <Route path="Logout" element={<Lougout />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="comment" element={<Comment userName='@BillyJoeArmstrong' commentText="Haha trop drôle !" commentDate="15:25 13 août 25"/>} />
          <Route path="register" element={<Register />} />
          <Route path="post-detail/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
