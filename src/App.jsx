import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Home from './pages/Home.jsx';
import Schedule from './pages/Schedule.jsx';
import Booking from './pages/Booking.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Contact from './pages/Contact.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';

function App() {
  return (
    <div className="pb-bottom-nav">
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            🧘 Power Flow Yoga
          </Navbar.Brand>
          <div className="d-lg-none ms-auto">
            {/* Mobile menu will use bottom nav instead */}
          </div>
        </Container>
      </Navbar>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/book/:sessionId" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default App;