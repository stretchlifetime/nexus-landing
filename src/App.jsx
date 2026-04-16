import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Landing from './pages/Landing';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
           <Route path="/" element={<Landing />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/mgmt" element={<Admin />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

