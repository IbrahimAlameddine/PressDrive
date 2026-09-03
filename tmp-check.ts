import 'dotenv/config';
import { prisma } from './lib/prisma';

void (async () => {
  try {
    const users = await prisma.user.findMany({ take: 10, select: { id: true, username: true, email: true, role: true } });
    console.log(JSON.stringify(users));
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error('ERROR_MESSAGE', error.message);
    console.error('ERROR_NAME', error.name);
    console.error('ERROR_STACK', error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
