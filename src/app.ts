import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.routes';

app.use(express.json());
app.use(express.text());
app.use(cors());

// user api

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
