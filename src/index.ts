import express from 'express';
import ViewRouter from './routes/IndexRouter';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

new ViewRouter(app);

app.listen(3333);