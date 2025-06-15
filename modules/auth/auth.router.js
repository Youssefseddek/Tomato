import { Router } from "express";
import * as authController from "./controller/auth.js";

const router = Router()

// signup
router.post("/signup",authController.signup)

// confirm email
router.get("/confirmEmail/:token",authController.confirmEmail)

// login
router.post("/signin",authController.login)

// - Forget password ( One time access link ) 
router.patch('/sendCode',  authController.sendCode)

router.get('/forgetPassword/:token',  authController.forgetPassword)



export default router