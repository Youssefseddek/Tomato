import { Router } from "express";
import * as  tomatoController from "./controller/tomato.js";
import auth from "../../middleWare/authentication.js";
import { myMulter, validationTypes } from "../../services/multer.js";

const router = Router()


// get all tomatoes
router.get("/",auth(), tomatoController.getTomato);

// add tomato
router.post("/addTomato",auth(),myMulter(validationTypes.image,'tomato').single('photo'), tomatoController.addTomato)

// update tomato Photo
router.put("/updateTomatoPhoto/:id",auth(),myMulter(validationTypes.image,'tomato').single('photo'), tomatoController.updateTomatoPhoto )


export default router