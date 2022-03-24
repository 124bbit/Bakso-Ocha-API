const express = require("express");
const bihunAyam = require("../controllers/bihunayam.controller");
const Router = express.Router();

Router.post("/", bihunAyam.createBihunAyam);
Router.get("/", bihunAyam.getAllBihunAyam);
Router.get("/:slug", bihunAyam.findBihunAyamBySlug);
Router.patch("/:id", bihunAyam.updateBihunAyam);
Router.delete("/:id", bihunAyam.deleteBihunAyam);
module.exports = Router;
