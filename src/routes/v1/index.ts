import { Router } from "express";
const router = Router();

import token from "./token";
import users from "./users";
import contacts from "./contacts";

router.use("/token", token);
router.use("/users", users);
router.use("/contacts", contacts);

export default router;
