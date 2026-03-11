import express from 'express';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all classes
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Get class by ID
app.get('/api/classes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fitnessClass = await prisma.class.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!fitnessClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    
    res.json(fitnessClass);
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ error: 'Failed to fetch class' });
  }
});

// Get all instructors
app.get('/api/instructors', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      select: { instructor: true },
      distinct: ['instructor']
    });
    const instructors = classes.map(c => c.instructor);
    res.json(instructors);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
});

// Get classes by instructor
app.get('/api/instructor/:name/classes', async (req, res) => {
  try {
    const { name } = req.params;
    const classes = await prisma.class.findMany({
      where: { instructor: { equals: name, mode: 'insensitive' } }
    });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching instructor classes:', error);
    res.status(500).json({ error: 'Failed to fetch instructor classes' });
  }
});

// Serve static files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all for SPA (must be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});