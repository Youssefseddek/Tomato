import {Router} from 'express';
import * as growthController from './controller/growth.js';
import { myMulter, validationTypes } from '../../services/multer.js';




const router = Router();


// add new plant growth stage
router.post('/addPlant',myMulter(validationTypes.image).single('photo'), growthController.addGrowthStage);

// update photo of a plant growth stage
router.put('/updatePlantPhoto/:id', myMulter(validationTypes.image).single('photo'), growthController.updatePlantPhoto);

// update plant status
router.put('/updatePlantStatus/:id', growthController.updatePlantStatus);

// get all plants
router.get('/getPlants', growthController.getPlants);

// get plant by id
router.get('/getPlantById/:id', growthController.getPlantById);

// delete plant by id
router.delete('/deletePlant/:id', growthController.deletePlant);

export default router;