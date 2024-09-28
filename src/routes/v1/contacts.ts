import { Router } from "express";

import { ContactController } from "@modules/contact/controller";
import {
  createContactSchema,
  updateContactSchema,
} from "@modules/contact/dataTransferSchema";

import validatePayload from "@middlewares/validatePayload";
import auth from "@middlewares/auth";
import authActive from "@middlewares/authActive";

const router = Router();
const contactController = new ContactController();

router.get("/", auth, authActive, contactController.gets);
router.get("/:id", auth, authActive, contactController.get);
router.delete("/:id", auth, authActive, contactController.delete);

router.post(
  "/",
  [auth, authActive, validatePayload(createContactSchema)],
  contactController.create
);

router.put(
  "/:id",
  [auth, authActive, validatePayload(updateContactSchema)],
  contactController.update
);

export default router;
