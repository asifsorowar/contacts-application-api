import { Router } from "express";
const router = Router();

import token from "./token";
import users from "./users";

router.use("/token", token);
router.use("/users", users);

export default router;
