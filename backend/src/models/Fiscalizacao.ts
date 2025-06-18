import mongoose, { Document, Schema } from 'mongoose';

export enum StatusObra {
  EmDia = 'Em dia',
  Atrasada = 'Atrasada',
  Parada = 'Parada'
}

export interface IFiscalizacao extends Document {
  data: Date;
  status: StatusObra;
  observacoes: string;
  localizacao: {
    type: string;
    coordinates: [number, number];
  };
  fotoPath: string;
  obra: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FiscalizacaoSchema: Schema = new Schema({
  data: { type: Date, required: true, default: Date.now },
  status: { 
    type: String, 
    required: true, 
    enum: Object.values(StatusObra) 
  },
  observacoes: { type: String, required: false },
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
  fotoPath: { type: String, required: true },
  obra: { 
    type: Schema.Types.ObjectId, 
    ref: 'Obra', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FiscalizacaoSchema.index({ localizacao: '2dsphere' });

export default mongoose.model<IFiscalizacao>('Fiscalizacao', FiscalizacaoSchema);