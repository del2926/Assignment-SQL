const express = require("express");

const app = express();

const userRoutes = require("./routes/user");

// const userMiddlewares = require("./middlewares/user");

app.use(express.json());

// app.use(userMiddlewares.parseUserToken);

app.use(userRoutes);

app.listen(3000);
