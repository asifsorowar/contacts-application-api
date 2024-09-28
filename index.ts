import express from "express";
const app = express();

import "./src/startup/config";
import routers from "./src/startup/routers";

routers(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}....`));
