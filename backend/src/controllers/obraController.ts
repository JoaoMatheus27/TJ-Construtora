import { Request, Response } from 'express';
import Obra, { IObra } from '../models/Obra';
import Fiscalizacao from '../models/Fiscalizacao';
import { StatusObra } from '../models/Fiscalizacao';

export const createObra = async (req: Request, res: Response) => {
  try {
    const { nome, responsavel, dataInicio, previsaoTermino, descricao, latitude, longitude } = req.body;
    
    const obra: IObra = new Obra({
      nome,
      responsavel,
      dataInicio: new Date(dataInicio),
      previsaoTermino: new Date(previsaoTermino),
      localizacao: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      fotoPath: req.file?.path || '',
      descricao
    });

    await obra.save();
    res.status(201).json(obra);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar obra', error });
  }
};

export const getAllObras = async (req: Request, res: Response) => {
  try {
    const obras = await Obra.find().sort({ createdAt: -1 });
    res.json(obras);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obras', error });
  }
};

export const getObraById = async (req: Request, res: Response) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }
    res.json(obra);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obra', error });
  }
};

export const updateObra = async (req: Request, res: Response) => {
  try {
    const { nome, responsavel, dataInicio, previsaoTermino, descricao, latitude, longitude } = req.body;
    
    const updateData: any = {
      nome,
      responsavel,
      dataInicio: new Date(dataInicio),
      previsaoTermino: new Date(previsaoTermino),
      localizacao: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      descricao,
      updatedAt: new Date()
    };

    if (req.file?.path) {
      updateData.fotoPath = req.file.path;
    }

    const obra = await Obra.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!obra) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }
    res.json(obra);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar obra', error });
  }
};

export const deleteObra = async (req: Request, res: Response) => {
  try {
    const obra = await Obra.findByIdAndDelete(req.params.id);
    if (!obra) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }
    
    // Remove todas as fiscalizações associadas
    await Fiscalizacao.deleteMany({ obra: req.params.id });
    
    res.json({ message: 'Obra e fiscalizações associadas removidas com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover obra', error });
  }
};

export const getFiscalizacoesByObra = async (req: Request, res: Response) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find({ obra: req.params.id }).sort({ data: -1 });
    res.json(fiscalizacoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fiscalizações', error });
  }
};