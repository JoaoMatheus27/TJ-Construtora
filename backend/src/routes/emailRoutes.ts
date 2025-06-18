import express from 'express';
import * as fiscalizacaoController from '../controllers/fiscalizacaoController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Rotas para fiscalizações
router.post('/', upload.single('foto'), fiscalizacaoController.createFiscalizacao);
router.get('/', fiscalizacaoController.getAllFiscalizacoes);
router.get('/:id', fiscalizacaoController.getFiscalizacaoById);
router.put('/:id', upload.single('foto'), fiscalizacaoController.updateFiscalizacao);
router.delete('/:id', fiscalizacaoController.deleteFiscalizacao);

export default router;