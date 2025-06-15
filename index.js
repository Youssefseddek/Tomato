import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connecetDB from "./DB/connection.js";
import * as indexRouter from './modules/index.router.js'

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || '/api/v1'

app.use(express.json());

app.use(`${baseUrl}/uploads`,express.static('./uploads'))

app.use(`${baseUrl}/auth`,indexRouter.authRouter)
app.use(`${baseUrl}/user`,indexRouter.userRouter)
app.use(`${baseUrl}/farm`,indexRouter.farmRouter)
app.use(`${baseUrl}/tomato`,indexRouter.tomatoRouter)
app.use(`${baseUrl}/growth`,indexRouter.growthRouter)


app.get("/", (req, res) => res.send("Hello World!"));

connecetDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
