const express = require("express");
const Minuman = require("../controllers/minuman.controller.js");
const Router = express.Router();

Router.post("/", Minuman.createMinuman);
Router.get("/", Minuman.getAllMinuman);
Router.get("/:slug", Minuman.findMinumanBySlug);
Router.patch("/:id", Minuman.updateMinuman);
Router.delete("/:id", Minuman.deleteMinuman);
module.exports = Router;
