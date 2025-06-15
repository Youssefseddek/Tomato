import { Router } from "express";
import * as userController from "./controller/user.js";
import { HME, myMulter, validationTypes } from "../../services/multer.js";

const router = Router();

router.get("/", userController.getUsers);


router.post("/addImage",myMulter(validationTypes.image).single('image'),HME, userController.addImage);

export default router;
