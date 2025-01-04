"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userRepository_1 = require("../service/UserUseCases/repository/userRepository");
const userService_1 = require("../service/UserUseCases/userService");
const encrypterProvider_1 = require("../service/providers/encrypterProvider");
const userRepository = new userRepository_1.UserRepository();
const encrypterProvider = new encrypterProvider_1.EncrypterProvider();
const userService = new userService_1.UserService(userRepository, encrypterProvider);
const userController = new userController_1.UserController(userService);
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    await userController.login(req, res);
});
router.post('/schedule', async (req, res) => {
    await userController.createSchedule(req, res);
});
router.get('/schedule/month', async (req, res) => {
    await userController.listSchedules(req, res);
});
router.get('/schedule/day', async (req, res) => {
    await userController.listDaySchedules(req, res);
});
router.get("/schedule/hours", async (req, res) => {
    await userController.getAvailableHours(req, res);
});
exports.default = router;
