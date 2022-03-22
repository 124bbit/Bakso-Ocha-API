const express = require("express");
const Bakso = require("../controllers/bakso.controller");
const Router = express.Router();

Router.post("/", Bakso.createBakso);
Router.get("/", Bakso.getAllBakso);
Router.get("/:slug", Bakso.findBakso);
Router.patch("/:id", Bakso.updateBakso);
Router.delete("/:id", Bakso.deleteBakso);

module.exports = Router;
