import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { IUser } from '../../../model/IUser';
import { ISchedule } from '../../../model/ISchedule';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
    constructor(
        private prisma: PrismaClient = new PrismaClient(),
    ) {}

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.prisma.user.findFirst({
            where: { email }
        });

        if (user) {
            return {
                ...user,
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            } as IUser;
        }

        return null;
    }

    async createUser(user: IUser): Promise<IUser> {
        const createdUser = await this.prisma.user.create({
            data: {
                id: uuidv4(),
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
        } as IUser;
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await this.findByEmail(email);
        return user;
    }

    async createSchedule(schedule: ISchedule): Promise<ISchedule> {
        const date = new Date(schedule.date); // Converte schedule.date para um objeto Date
        return await this.prisma.schedules.create({
            data: {
                id: uuidv4(),
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

    async getAllMonthSchedules(): Promise<ISchedule[]> {
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

    async getAllDaySchedules(): Promise<ISchedule[]> {
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

    async getAvailableHours(date: Date): Promise<string[]> {
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
        const bookedHours = schedules.map((schedule: any) => schedule.hour);
    
        return allHours.filter((hour) => !bookedHours.includes(hour));
    }
}