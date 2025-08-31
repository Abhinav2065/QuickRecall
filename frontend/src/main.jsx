import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Router, Route, Routes} from 'react-router-dom';
import App from './App.jsx'
import Hero from './Hero.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import GetStarted from './GetStarted.jsx';
import './assets/main.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <BrowserRouter>    <Navbar></Navbar>
    <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
    <Footer></Footer>
    </BrowserRouter>
    </Router>
  </StrictMode>,
)
