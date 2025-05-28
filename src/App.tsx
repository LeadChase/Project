import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { Home } from './components/Home.js';
import { About } from './components/About.js';
import { Contact } from './components/Contact.js';
import { Waitlist } from './components/Waitlist.js';
import { Confirm } from './components/Confirm.js';
import { FreeSystemDemo } from './components/freeSystemDemo.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join-waitlist" element={<Waitlist />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/freeSystemDemo" element={<FreeSystemDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;