"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    userRepository;
    encrypterProvider;
    constructor(userRepository, encrypterProvider) {
        this.userRepository = userRepository;
        this.encrypterProvider = encrypterProvider;
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user && await this.encrypterProvider.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async createSchedule(schedule) {
        return await this.userRepository.createSchedule(schedule);
    }
    async listSchedules() {
        return await this.userRepository.getAllMonthSchedules();
    }
    async listDaySchedules() {
        return await this.userRepository.getAllDaySchedules();
    }
    async getAvailableHours(date) {
        return await this.userRepository.getAvailableHours(date);
    }
}
exports.UserService = UserService;
