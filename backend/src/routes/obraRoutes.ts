import express from 'express';
import * as obraController from '../controllers/obraController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Rotas para obras
router.post('/', upload.single('foto'), obraController.createObra);
router.get('/', obraController.getAllObras);
router.get('/:id', obraController.getObraById);
router.put('/:id', upload.single('foto'), obraController.updateObra);
router.delete('/:id', obraController.deleteObra);
router.get('/:id/fiscalizacoes', obraController.getFiscalizacoesByObra);

export default router;