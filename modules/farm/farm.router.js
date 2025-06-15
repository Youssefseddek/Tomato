import { Router } from "express";
import * as farmController from "./controller/farm.js";
import auth from "../../middleWare/authentication.js";

const router = Router()

// get farms
router.get("/", farmController.getFarms);

// search farms by name
router.get("/search", farmController.searchFarms);

// get farm by id
router.get("/farmById/:id", farmController.getFarmById);


// ======================================== favorite farms ========================================

// favorite farm
router.post("/favorite/:id",auth(), farmController.favoriteFarm);

// unfavorite farm
router.delete("/unfavorite/:id",auth(), farmController.unFavoriteFarm);

// get favorite farms
router.get("/getFavorites",auth(), farmController.getFavoriteFarms);



export default router