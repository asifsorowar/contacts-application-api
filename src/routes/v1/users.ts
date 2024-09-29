import { Router } from "express";

import { UserController } from "@modules/user/controller";
import { createUserSchema } from "@modules/user/dataTransferSchema";
import authToken from "@root/src/middlewares/authToken";
import validatePayload from "@middlewares/validatePayload";

const router = Router();
const userController = new UserController();

router.post("/", validatePayload(createUserSchema), userController.create);
router.put("/active", authToken, userController.active);

export default router;
