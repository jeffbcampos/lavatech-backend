import { ISchedule } from '../../model/ISchedule';
import { IUser } from '../../model/IUser';
import { EncrypterProvider } from '../providers/encrypterProvider';
import { IUserRepository } from './repository/IUserRepository';

export class UserService {
    constructor(
        private userRepository: IUserRepository,
        private encrypterProvider: EncrypterProvider
    ){}

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await this.encrypterProvider.compare(password, user.password)) {
            return user;
        }
        return null;
    }    

    async createSchedule(schedule: ISchedule): Promise<ISchedule> {
        return await this.userRepository.createSchedule(schedule);
    }

    async listSchedules(): Promise<ISchedule[]> {
        return await this.userRepository.getAllMonthSchedules();
    }

    async listDaySchedules(): Promise<ISchedule[]> {
        return await this.userRepository.getAllDaySchedules();
    }

    async getAvailableHours(date: Date): Promise<string[]> {
        return await this.userRepository.getAvailableHours(date);
    }

    async getMonthlyReport(month: number, year: number): Promise<{ report: ISchedule[]; total: number }> {
        const schedules = await this.userRepository.getReportMonthSchedules(month, year);
        const total = schedules.reduce((acc, schedule) => acc + Number(schedule.price), 0);
        return { report: schedules, total };
    }
}