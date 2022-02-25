import express from 'express';
import Router from './router';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

new Router(app);

app.listen(3333);