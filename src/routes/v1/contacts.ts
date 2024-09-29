import { Router } from "express";

import { ContactController } from "@modules/contact/controller";
import {
  createContactSchema,
  updateContactSchema,
} from "@modules/contact/dataTransferSchema";

import validatePayload from "@middlewares/validatePayload";
import authToken from "@root/src/middlewares/authToken";
import authActive from "@middlewares/authActive";

const router = Router();
const contactController = new ContactController();

router.get("/", authToken, authActive, contactController.gets);
router.get("/:id", authToken, authActive, contactController.get);
router.delete("/:id", authToken, authActive, contactController.delete);

router.post(
  "/",
  [authToken, authActive, validatePayload(createContactSchema)],
  contactController.create
);

router.put(
  "/:id",
  [authToken, authActive, validatePayload(updateContactSchema)],
  contactController.update
);

export default router;
