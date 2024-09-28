import { Router } from "express";

import { UserController } from "@modules/user/controller";
import { createUserSchema } from "@modules/user/dataTransferSchema";
import auth from "@middlewares/auth";
import validatePayload from "@middlewares/validatePayload";

const router = Router();
const userController = new UserController();

router.post("/", validatePayload(createUserSchema), userController.create);
router.put("/active", auth, userController.active);

export default router;
