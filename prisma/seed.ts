import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
    const account = await prisma.account.create({
        data: {
            id: 1,
            name: 'Acme Corp',
            isActive: true,
        },
    });

    const agent = await prisma.agent.create({
        data: {
            id: 1,
            name: 'Agent Smith',
            isActive: true,
        },
    });

    const schedule = await prisma.schedule.create({
        data: {
            id: randomUUID(),
            accountId: account.id,
            agentId: agent.id,
            startTime: new Date(),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
    });

    await prisma.task.create({
        data: {
            id: randomUUID(),
            accountId: account.id,
            scheduleId: schedule.id,
            startTime: new Date(),
            duration: 60,
            type: 'work',
        },
    });
}

main()
    .then(() => {
        console.log('✅ Seed completed.');
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        prisma.$disconnect();
        process.exit(1);
    });
