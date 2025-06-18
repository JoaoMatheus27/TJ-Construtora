import mongoose, { Document, Schema } from 'mongoose';

export interface IObra extends Document {
  nome: string;
  responsavel: string;
  dataInicio: Date;
  previsaoTermino: Date;
  localizacao: {
    type: string;
    coordinates: [number, number];
  };
  fotoPath: string;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
}

const ObraSchema: Schema = new Schema({
  nome: { type: String, required: true },
  responsavel: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  previsaoTermino: { type: Date, required: true },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  fotoPath: { type: String, required: false },
  descricao: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ObraSchema.index({ localizacao: '2dsphere' });

export default mongoose.model<IObra>('Obra', ObraSchema);