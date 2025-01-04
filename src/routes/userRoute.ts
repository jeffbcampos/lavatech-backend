import { Router, Request, Response } from 'express';
import { UserController } from '../controller/userController';

import { UserRepository } from '../service/UserUseCases/repository/userRepository';
import { UserService } from '../service/UserUseCases/userService';
import { EncrypterProvider } from '../service/providers/encrypterProvider';

const userRepository = new UserRepository();
const encrypterProvider = new EncrypterProvider();
const userService = new UserService(userRepository, encrypterProvider);
const userController = new UserController(userService);

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    await userController.login(req, res)});
router.post('/schedule', async (req: Request, res: Response) => {
    await userController.createSchedule(req, res)});
router.get('/schedule/month', async (req: Request, res: Response) => {
    await userController.listSchedules(req, res);
});
router.get('/schedule/day', async (req: Request, res: Response) => {
    await userController.listDaySchedules(req, res)});
router.get("/schedule/hours", async (req: Request, res: Response) => {
    await userController.getAvailableHours(req, res);
});
router.get("/report/month", async (req: Request, res: Response) => {
    await userController.getMonthlyReport(req, res);
});
export default router;