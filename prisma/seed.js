import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

const classes = [
  {
    name: 'HIIT Blast',
    instructor: 'Coach Sarah',
    duration: 45,
    intensity: 'high',
    description: 'High-intensity interval training to torch calories and build endurance',
    image: '#FF6B6B',
    schedule: 'Mon, Wed, Fri at 6:30 AM',
    capacity: 20
  },
  {
    name: 'Power Yoga',
    instructor: 'Master Liu',
    duration: 60,
    intensity: 'medium',
    description: 'Strengthen your body and calm your mind with dynamic flowing sequences',
    image: '#4ECDC4',
    schedule: 'Tue, Thu at 7:00 AM',
    capacity: 25
  },
  {
    name: 'Spin Cycle',
    instructor: 'Coach Mike',
    duration: 50,
    intensity: 'high',
    description: 'Heart-pumping indoor cycling with motivating beats',
    image: '#45B7D1',
    schedule: 'Mon, Wed, Fri at 5:30 PM',
    capacity: 30
  },
  {
    name: 'Pilates Core',
    instructor: 'Instructor Emma',
    duration: 55,
    intensity: 'low',
    description: 'Build core strength and improve flexibility with controlled movements',
    image: '#96CEB4',
    schedule: 'Tue, Thu at 9:00 AM',
    capacity: 20
  },
  {
    name: 'Box Fit',
    instructor: 'Coach Alex',
    duration: 45,
    intensity: 'high',
    description: 'Boxing-inspired workout combining cardio and strength training',
    image: '#FFEAA7',
    schedule: 'Wed, Fri at 6:00 PM',
    capacity: 22
  },
  {
    name: 'Dance Fusion',
    instructor: 'Instructor Maria',
    duration: 50,
    intensity: 'medium',
    description: 'Fun choreographed dance routines to burn calories and groove',
    image: '#DDA0DD',
    schedule: 'Sat at 9:00 AM',
    capacity: 30
  },
  {
    name: 'Strength Zone',
    instructor: 'Coach Jake',
    duration: 60,
    intensity: 'high',
    description: 'Full-body strength training with free weights and machines',
    image: '#FF8C00',
    schedule: 'Mon, Wed, Fri at 7:00 PM',
    capacity: 25
  },
  {
    name: 'Zen Stretch',
    instructor: 'Instructor Lisa',
    duration: 45,
    intensity: 'low',
    description: 'Gentle stretching and mobility work for all fitness levels',
    image: '#87CEEB',
    schedule: 'Tue, Thu at 6:00 PM',
    capacity: 35
  }
];

async function main() {
  console.log('Seeding fitness classes...');
  
  await prisma.class.createMany({
    data: classes,
    skipDuplicates: true,
  });
  
  console.log(`Seeded ${classes.length} fitness classes!`);
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });