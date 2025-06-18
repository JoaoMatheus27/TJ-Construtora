import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import obraRoutes from './routes/obraRoutes';
import fiscalizacaoRoutes from './routes/fiscalizacaoRoutes';
import emailRoutes from './routes/emailRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/obras', obraRoutes);
app.use('/api/fiscalizacoes', fiscalizacaoRoutes);
app.use('/api/email', emailRoutes);

// Conexão com o banco de dados e inicialização do servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});