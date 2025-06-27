import { Router } from "express";
import * as userController from "./controller/user.js";
import { HME, myMulter, validationTypes } from "../../services/multer.js";
import auth from "../../middleWare/authentication.js";

const router = Router();

router.get("/",auth(), userController.getUsers);


// router.post("/addImage",myMulter(validationTypes.image).single('image'),HME, userController.addImage);

// edit user profile
router.put("/editProfile",auth(), myMulter(validationTypes.image).single('image'), HME, userController.editProfile);

export default router;
