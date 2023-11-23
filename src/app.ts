import express from 'express'
const app = express();
import cors from 'cors'


app.use(express.json())
app.use(express.text())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
