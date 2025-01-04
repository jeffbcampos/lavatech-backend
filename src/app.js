"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /c:/Users/NatyeJeff/Documents/Projeto-Julio/src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', userRoute_1.default);
app.get('/swagger_output.json', (req, res) => {
    res.sendFile(__dirname + '/swagger_output.json');
});
app.get('/', (req, res) => {
    res.status(200).json({ msg: "success" });
});
app.listen(3001, () => {
    console.log('Server on port 3001');
});
