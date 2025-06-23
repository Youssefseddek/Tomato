import { Router } from "express";
import * as  tomatoController from "./controller/tomato.js";
import auth from "../../middleWare/authentication.js";
import { myMulter, validationTypes } from "../../services/multer.js";

const router = Router()


// get all tomatoes
router.get("/",auth(), tomatoController.getTomato);

// add tomato
router.post("/addTomato",auth(),myMulter(validationTypes.image).single('photo'), tomatoController.addTomato)

// update tomato Photo
router.put("/updateTomato/:id",auth(),myMulter(validationTypes.image).single('photo'), tomatoController.updateTomatoPhoto )

// delete tomato
router.delete("/deleteTomato/:id",auth(), tomatoController.deleteTomato)

// get tomato by id
router.get("/:id",auth(), tomatoController.getTomatoById)

export default router