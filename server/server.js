import express from 'express';
import connectDB from './config/db.js';
import 'dotenv/config';
import teacher from './routes/teacher.route.js';
import cors from 'cors';


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use(cors());
app.use("/api/teacher",teacher);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});