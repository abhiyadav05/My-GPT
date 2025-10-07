import express, { text } from "express";
import {protect} from "../middlewares/auth.js";
import { textMessageController } from "../controllers/messageController.js";
import { imageMessageController } from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.post("/text",protect, textMessageController);
messageRouter.post("/image",protect, imageMessageController);

export default messageRouter;