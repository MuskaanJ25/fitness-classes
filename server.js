import express from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get class type info
app.get('/api/class', async (req, res) => {
  try {
    const classType = await prisma.classType.findFirst({
      include: {
        sessions: {
          where: {
            startTime: { gte: new Date() },
            status: 'scheduled',
          },
          orderBy: { startTime: 'asc' },
          take: 1,
        },
      },
    });
    
    if (!classType) {
      return res.status(404).json({ error: 'Class type not found' });
    }
    
    res.json(classType);
  } catch (err) {
    console.error('Error fetching class type:', err);
    res.status(500).json({ error: 'Failed to fetch class type' });
  }
});

// Get upcoming sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const from = req.query.from ? new Date(req.query.from) : new Date();
    
    const sessions = await prisma.session.findMany({
      where: {
        startTime: { gte: from },
        status: 'scheduled',
      },
      include: { classType: true },
      orderBy: { startTime: 'asc' },
    });
    
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get session by ID
app.get('/api/sessions/:id', async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { classType: true },
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json(session);
  } catch (err) {
    console.error('Error fetching session:', err);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { sessionId, customerName, email, phone } = req.body;
    
    if (!sessionId || !customerName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check session exists and has spots
    const session = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    if (session.spotsRemaining <= 0) {
      return res.status(400).json({ error: 'Session is fully booked' });
    }
    
    if (session.status !== 'scheduled') {
      return res.status(400).json({ error: 'Session is not available for booking' });
    }
    
    // Check for existing booking
    const existingBooking = await prisma.booking.findFirst({
      where: {
        sessionId: parseInt(sessionId),
        email,
        status: 'confirmed',
      },
    });
    
    if (existingBooking) {
      return res.status(400).json({ error: 'You already have a booking for this session' });
    }
    
    // Create booking and decrement spots
    await prisma.$transaction([
      prisma.booking.create({
        data: {
          sessionId: parseInt(sessionId),
          customerName,
          email,
          phone,
          status: 'confirmed',
        },
      }),
      prisma.session.update({
        where: { id: parseInt(sessionId) },
        data: { spotsRemaining: { decrement: 1 } },
      }),
    ]);
    
    // Return updated session
    const updatedSession = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
      include: { classType: true },
    });
    
    res.status(201).json(updatedSession);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get bookings by email
app.get('/api/bookings', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const bookings = await prisma.booking.findMany({
      where: {
        email,
        status: 'confirmed',
      },
      include: { session: { include: { classType: true } } },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Cancel booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }
    
    // Cancel booking and increment spots
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'cancelled' },
      }),
      prisma.session.update({
        where: { id: booking.sessionId },
        data: { spotsRemaining: { increment: 1 } },
      }),
    ]);
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Production: serve static files from dist
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, 'dist');
  
  app.use(express.static(distPath));
  
  // Catch-all for SPA
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});