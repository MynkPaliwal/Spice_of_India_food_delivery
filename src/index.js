import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Navbar from './components/Navbar.tsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from './components/Menu.tsx';
import Home from './components/Home.tsx';
import About from './components/About';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer';
import Login from './components/Login.tsx';
import Profile from './components/Profile';
import Card from './components/Card';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/contact"
              element={<Contact heading="Get in touch" intro="We usually respond within 24 hours." />}
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/card" element={<Card />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
