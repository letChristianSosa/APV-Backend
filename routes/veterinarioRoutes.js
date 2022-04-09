import express from 'express';
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router();

// AREA PUBLICA

// Post para registrar un nuevo veterinario
router.post('/', registrar);
// Get para confirmar el token, se pasa el token como param
router.get('/confirmar/:token', confirmar);
// Post para logear con correo y contrasena
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


// AREA PRIVADA
// Get para autenticar el perfil 
router.get('/perfil', checkAuth, perfil);

export default router;