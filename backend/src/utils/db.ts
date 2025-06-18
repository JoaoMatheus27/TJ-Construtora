import mongoose from 'mongoose';
import { IObra } from '../models/Obra';
import { IFiscalizacao } from '../models/Fiscalizacao';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tj-construtora');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export { IObra, IFiscalizacao };