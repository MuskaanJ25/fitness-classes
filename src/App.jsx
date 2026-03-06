import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NavBar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import Home from './pages/Home.jsx';
import Schedule from './pages/Schedule.jsx';
import Booking from './pages/Booking.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <ErrorBoundary>
      <div className="d-flex flex-column min-vh-100 pb-bottom-nav">
        <NavBar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/book/:sessionId" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </ErrorBoundary>
  );
}

export default App;