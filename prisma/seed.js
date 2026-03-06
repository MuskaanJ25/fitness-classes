import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  // Create single class type
  const classType = await prisma.classType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Power Flow Yoga',
      description: 'A dynamic vinyasa flow class that builds strength, flexibility, and mindfulness. Suitable for all levels with modifications provided.',
      durationMinutes: 60,
      level: 'All Levels',
      location: 'Main Studio, 123 Fitness Street',
    },
  });
  console.log('Created class type:', classType.name);
  
  // Generate sessions for next 4 weeks
  const sessions = [];
  const today = new Date();
  
  // Start from next Monday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const sessionTimes = [
    { dayOffset: 0, hour: 18 }, // Monday 6 PM
    { dayOffset: 2, hour: 18 }, // Wednesday 6 PM
    { dayOffset: 5, hour: 9 },  // Saturday 9 AM
    { dayOffset: 5, hour: 11 }, // Saturday 11 AM
  ];
  
  for (let week = 0; week < 4; week++) {
    for (const time of sessionTimes) {
      const startTime = new Date(startOfWeek);
      startTime.setDate(startOfWeek.getDate() + week * 7 + time.dayOffset);
      startTime.setHours(time.hour, 0, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + classType.durationMinutes);
      
      // Skip sessions in the past
      if (startTime < new Date()) continue;
      
      sessions.push({
        classId: classType.id,
        startTime,
        endTime,
        capacity: 15,
        spotsRemaining: 15,
        status: 'scheduled',
      });
    }
  }
  
  // Insert sessions
  await prisma.session.deleteMany({});
  for (const session of sessions) {
    await prisma.session.create({ data: session });
  }
  
  console.log(`Created ${sessions.length} sessions`);
  
  // Clear existing bookings
  await prisma.booking.deleteMany({});
  console.log('Cleared existing bookings');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });