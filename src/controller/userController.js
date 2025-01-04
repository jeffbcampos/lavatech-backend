"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async login(req, res) {
        try {
            const user = req.body;
            if (!user.email || !user.password) {
                return res.status(400).json({ msg: 'Email or Password not provided' });
            }
            const login = await this.userService.login(user.email, user.password);
            if (!login) {
                return res.status(400).json('Email or password incorrect');
            }
            return res.status(200).json({ statusCode: 200, msg: 'Login Success', login });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }
    async createSchedule(req, res) {
        try {
            const schedule = req.body;
            if (!schedule) {
                return res.status(400).json({ msg: 'Schedule not provided' });
            }
            const newSchedule = await this.userService.createSchedule(schedule);
            return res.status(201).json({ msg: 'success', newSchedule });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }
    async listSchedules(req, res) {
        try {
            const schedules = await this.userService.listSchedules();
            return res.status(200).json({ msg: 'success', schedules });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }
    async listDaySchedules(req, res) {
        try {
            const schedules = await this.userService.listDaySchedules();
            return res.status(200).json({ msg: 'success', schedules });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }
    async getAvailableHours(req, res) {
        try {
            const date = req.query.date; // Obter a data dos parâmetros de consulta
            if (!date) {
                return res.status(400).json({ msg: 'Date not provided' });
            }
            const availableHours = await this.userService.getAvailableHours(new Date(date));
            return res.status(200).json({ msg: 'success', hours: availableHours });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }
}
exports.UserController = UserController;
