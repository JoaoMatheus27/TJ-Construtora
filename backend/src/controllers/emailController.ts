import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Obra from '../models/Obra';
import Fiscalizacao from '../models/Fiscalizacao';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendObraEmail = async (req: Request, res: Response) => {
  try {
    const { obraId, email } = req.body;
    
    const obra = await Obra.findById(obraId);
    if (!obra) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }

    const fiscalizacoes = await Fiscalizacao.find({ obra: obraId }).sort({ data: -1 });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Relatório da Obra: ${obra.nome}`,
      html: `
        <h1>Relatório da Obra: ${obra.nome}</h1>
        <h2>Informações da Obra</h2>
        <p><strong>Responsável:</strong> ${obra.responsavel}</p>
        <p><strong>Data de Início:</strong> ${obra.dataInicio.toLocaleDateString()}</p>
        <p><strong>Previsão de Término:</strong> ${obra.previsaoTermino.toLocaleDateString()}</p>
        <p><strong>Localização:</strong> Latitude ${obra.localizacao.coordinates[1]}, Longitude ${obra.localizacao.coordinates[0]}</p>
        <p><strong>Descrição:</strong> ${obra.descricao}</p>
        
        <h2>Fiscalizações</h2>
        <table border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            ${fiscalizacoes.map(fisc => `
              <tr>
                <td>${fisc.data.toLocaleDateString()}</td>
                <td>${fisc.status}</td>
                <td>${fisc.observacoes || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail', error });
  }
};