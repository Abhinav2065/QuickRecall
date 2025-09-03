import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Hero from './Hero.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import GetStarted from './Accounts/GetStarted.jsx';
import Login from './Accounts/Login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Flashnotes from './Dashboard/Flashnotes.jsx';
import Quizzes from './Dashboard/Quizzes.jsx';
import Chat from './Dashboard/Chat.jsx';
import ShowNotes from './Dashboard/ShowNotes.jsx';
import ShowQuiz from './Dashboard/ShowQuiz.jsx';

import './assets/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/flashnotes' element={<Flashnotes/>}></Route>
        <Route path='/quizzes' element={<Quizzes/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/flashcard-viewer' element={<ShowNotes/>}></Route>
        <Route path='/show-quiz' element={<ShowQuiz/>}></Route>
        
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)