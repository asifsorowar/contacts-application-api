import { Router } from "express";

import { TokenController } from "@modules/token/controller";
import { loginSchema } from "@modules/token/dataTransferSchema";

import validatePayload from "@middlewares/validatePayload";

const router = Router();
const tokenController = new TokenController();

router.post("/auth", validatePayload(loginSchema), tokenController.login);

export default router;
