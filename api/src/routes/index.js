const { Router } = require('express');
const countryController = require('../controllers/countryController')
const activityController = require('../controllers/activityController')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries',countryController.getAllCountries)
router.get('/countries/:id',countryController.getCountryById)
router.get('/countries', countryController.getCountryByName);
router.post('/activities',activityController.createActivity)
router.delete('/activities/:name',activityController.deleteActivity)


module.exports = router;
