import { Request, Response } from "express";
import { UserService } from "../service/UserUseCases/userService";

export class UserController {
    constructor(
        private userService: UserService
    ){}

    async login(req: Request, res: Response): Promise<Response> {
        try {

            const user = req.body;

            if(!user.email || !user.password) {
                return res.status(400).json({msg: 'Email or Password not provided'})
            }

            const login = await this.userService.login(user.email, user.password)
            
            if(!login) {
                return res.status(400).json('Email or password incorrect')
            }

            return res.status(200).json({statusCode: 200, msg: 'Login Success', login})
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({status: error.statusCode || 500, msg: `${error.message}`});
        }
    }

    async createSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const schedule = req.body;
        
        if(!schedule) {
            return res.status(400).json({msg: 'Schedule not provided'});
        }

        const newSchedule = await this.userService.createSchedule(schedule);

        return res.status(201).json({msg: 'success', newSchedule});
            
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({status: error.statusCode || 500, msg: `${error.message}`});
        }
        
    }

    async listSchedules(req: Request, res: Response): Promise<Response> {
        try {
            const schedules = await this.userService.listSchedules();
            return res.status(200).json({msg: 'success', schedules})
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({status: error.statusCode || 500, msg: `${error.message}`});
        }
    }

    async listDaySchedules(req: Request, res: Response): Promise<Response> {
        try {
            const schedules = await this.userService.listDaySchedules();
            return res.status(200).json({msg: 'success', schedules})
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({status: error.statusCode || 500, msg: `${error.message}`});
        }
    }

    async getAvailableHours(req: Request, res: Response): Promise<Response> {
        try {
            const date = req.query.date as string; // Obter a data dos parâmetros de consulta
    
            if (!date) {
                return res.status(400).json({ msg: 'Date not provided' });
            }
    
            const availableHours = await this.userService.getAvailableHours(new Date(date));
    
            return res.status(200).json({ msg: 'success', hours: availableHours });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ status: error.statusCode || 500, msg: `${error.message}` });
        }
    }

    async getMonthlyReport(req: Request, res: Response): Promise<Response> {
        try {
            const { month, year } = req.query;

            const parsedMonth = parseInt(month as string, 10);
            const parsedYear = parseInt(year as string, 10);

            if (isNaN(parsedMonth) || isNaN(parsedYear)) {
                return res.status(400).json({ message: 'Parâmetros inválidos. Certifique-se de enviar mes e ano como números.' });
            }

            const { report, total } = await this.userService.getMonthlyReport(parsedMonth, parsedYear);
            return res.status(200).json({
                data: report,
                total: total.toFixed(2),
            });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao gerar o relatório mensal.' });
        }
    }


}