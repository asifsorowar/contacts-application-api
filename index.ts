import express from "express";
const app = express();

import "./src/startup/config";
import routers from "./src/startup/routers";

routers(app);

app.listen(5000, () => console.log("Server running...."));
