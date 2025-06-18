import { Request, Response } from 'express';
import Fiscalizacao, { StatusObra, IFiscalizacao } from '../models/Fiscalizacao';
import Obra from '../models/Obra';

export const createFiscalizacao = async (req: Request, res: Response) => {
  try {
    const { obraId, status, observacoes, latitude, longitude } = req.body;
    
    // Verifica se a obra existe
    const obra = await Obra.findById(obraId);
    if (!obra) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }

    const fiscalizacao: IFiscalizacao = new Fiscalizacao({
      data: new Date(),
      status,
      observacoes,
      localizacao: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      fotoPath: req.file?.path || '',
      obra: obraId
    });

    await fiscalizacao.save();
    res.status(201).json(fiscalizacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar fiscalização', error });
  }
};

export const getAllFiscalizacoes = async (req: Request, res: Response) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find().populate('obra').sort({ data: -1 });
    res.json(fiscalizacoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fiscalizações', error });
  }
};

export const getFiscalizacaoById = async (req: Request, res: Response) => {
  try {
    const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate('obra');
    if (!fiscalizacao) {
      return res.status(404).json({ message: 'Fiscalização não encontrada' });
    }
    res.json(fiscalizacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fiscalização', error });
  }
};

export const updateFiscalizacao = async (req: Request, res: Response) => {
  try {
    const { status, observacoes, latitude, longitude } = req.body;
    
    const updateData: any = {
      status,
      observacoes,
      localizacao: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      updatedAt: new Date()
    };

    if (req.file?.path) {
      updateData.fotoPath = req.file.path;
    }

    const fiscalizacao = await Fiscalizacao.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    ).populate('obra');
    
    if (!fiscalizacao) {
      return res.status(404).json({ message: 'Fiscalização não encontrada' });
    }
    res.json(fiscalizacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar fiscalização', error });
  }
};

export const deleteFiscalizacao = async (req: Request, res: Response) => {
  try {
    const fiscalizacao = await Fiscalizacao.findByIdAndDelete(req.params.id);
    if (!fiscalizacao) {
      return res.status(404).json({ message: 'Fiscalização não encontrada' });
    }
    res.json({ message: 'Fiscalização removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover fiscalização', error });
  }
};