const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const baksoRoutes = require("./routes/bakso.route");
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes Menu Bakso
app.use("/Bakso", baksoRoutes);

app.listen(process.env.PORT, () => {
  sequelize.sync({ alter: true });
  console.log(`> Running on http://localhost:${process.env.PORT}`);
});
