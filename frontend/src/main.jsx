import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Hero from './Hero.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import GetStarted from './Accounts/GetStarted.jsx';
import Login from './Accounts/Login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Flashnotes from './Dashboard/Flashnotes.jsx';
import Quizzes from './Dashboard/Quizzes.jsx';
import Chat from './Dashboard/Chat.jsx';
import ShowNotes from './Dashboard/ShowNotes.jsx';
import ShowQuiz from './Dashboard/ShowQuiz.jsx';
import './assets/main.css';

// Layout component for routes with Navbar and Footer
const LayoutWithFooter = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Layout component for Chat (only Navbar)
const ChatLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithFooter />}>
          <Route path="/" element={<Hero />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flashnotes" element={<Flashnotes />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/flashcard-viewer" element={<ShowNotes />} />
          <Route path="/show-quiz" element={<ShowQuiz />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);