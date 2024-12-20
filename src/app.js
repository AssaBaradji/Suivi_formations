import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors'
import express from 'express';
import studentRouter from './routes/studentRoute.js';
import moduleRouter from './routes/moduletRoute.js';
import inscriptionRouter from './routes/inscriptionRoute.js';
import payementRouter from './routes/payementRoute.js';
const app = express();

config();
// const corsOptions = {
//   origin: 'http://localhost:5173', // Origine de votre frontend, // Origine de votre frontend
//   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorise les méthodes nécessaires
//   // credentials: true,
//   // allowedHeaders: ['Content-Type', 'Authorization'],
//   optionSuccessStatus: 200,
// };

const allowedOrigins = ['http://localhost:5173', 'https://training-management-twdh.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', studentRouter );
app.use('/api', moduleRouter );
app.use('/api', inscriptionRouter );
app.use('/api', payementRouter );
app.get('/', (_req, res) => {
  res.send('hello Suivi');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
