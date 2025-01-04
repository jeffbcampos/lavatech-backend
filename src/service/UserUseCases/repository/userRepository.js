"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class UserRepository {
    prisma;
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findFirst({
            where: { email }
        });
        if (user) {
            return {
                ...user,
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            };
        }
        return null;
    }
    async createUser(user) {
        const createdUser = await this.prisma.user.create({
            data: {
                id: (0, uuid_1.v4)(),
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            }
        });
        return {
            ...createdUser,
            name: createdUser.name || '',
            email: createdUser.email || '',
            password: createdUser.password || ''
        };
    }
    async login(email, password) {
        const user = await this.findByEmail(email);
        return user;
    }
    async createSchedule(schedule) {
        const date = new Date(schedule.date); // Converte schedule.date para um objeto Date
        return await this.prisma.schedules.create({
            data: {
                id: (0, uuid_1.v4)(),
                name_client: schedule.name_client,
                cep: schedule.cep,
                address: schedule.address,
                type_service: schedule.type_service,
                price: schedule.price,
                date: date.toISOString(), // Garante que a data esteja no formato ISO-8601
                hour: schedule.hour,
            }
        });
    }
    async getAllMonthSchedules() {
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return await this.prisma.schedules.findMany({
            where: {
                date: {
                    gte: firstDay,
                    lte: lastDay,
                },
                hour: {
                    gte: '08:00',
                    lte: '19:00',
                },
            },
            orderBy: [
                { date: 'asc' },
                { hour: 'asc' },
            ],
        });
    }
    async getAllDaySchedules() {
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        return await this.prisma.schedules.findMany({
            where: {
                date: {
                    gte: firstDay,
                    lt: lastDay,
                },
                hour: {
                    gte: '08:00',
                    lte: '19:00',
                },
            },
            orderBy: [
                { hour: 'asc' },
            ],
        });
    }
    async getAvailableHours(date) {
        const day = date.getUTCDate();
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();
        const schedules = await this.prisma.schedules.findMany({
            where: {
                date: new Date(Date.UTC(year, month, day)),
            },
            select: {
                hour: true,
            },
        });
        const allHours = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
        const bookedHours = schedules.map((schedule) => schedule.hour);
        return allHours.filter((hour) => !bookedHours.includes(hour));
    }
}
exports.UserRepository = UserRepository;
