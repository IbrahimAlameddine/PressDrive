require('dotenv/config');
const { PrismaClient } = require('./app/generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
(async () => {
  try {
    const users = await prisma.user.findMany({ take: 5, select: { id: true, username: true, email: true, role: true } });
    console.log(JSON.stringify(users));
  } catch (e) {
    console.error('ERROR_MESSAGE', e && e.message);
    console.error('ERROR_NAME', e && e.name);
    console.error('ERROR_STACK', e && e.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
