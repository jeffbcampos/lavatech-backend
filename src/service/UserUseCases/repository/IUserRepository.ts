import { ISchedule } from "../../../model/ISchedule";
import { IUser } from "../../../model/IUser";


export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    login(email: string, password: string): Promise<IUser | null>;    
    createSchedule(schedule: ISchedule): Promise<ISchedule>;
    getAllMonthSchedules(): Promise<ISchedule[]>;
    getAllDaySchedules(): Promise<ISchedule[]>;
    getAvailableHours(date: Date): Promise<string[]>
    getReportMonthSchedules(month: number, year: number): Promise<ISchedule[]>
}