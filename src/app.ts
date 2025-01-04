// filepath: /c:/Users/NatyeJeff/Documents/Projeto-Julio/src/app.ts
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import router from './routes/userRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);


app.get('/swagger_output.json', (req, res) => {
  res.sendFile(__dirname + '/swagger_output.json');
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({msg: "success"})
});

app.listen(3001, ()=> {
    console.log('Server on port 3001')
});