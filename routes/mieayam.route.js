const express = require("express");
const MieAyam = require("../controllers/mieayam.controller");
const Router = express.Router();

Router.post("/", MieAyam.createMieAyam);
Router.get("/", MieAyam.getAllMieAyam);
Router.get("/:slug", MieAyam.findMieAyamBySlug);
Router.patch("/:id", MieAyam.updateMieAyam);
Router.delete("/:id", MieAyam.deleteMieAyam);
module.exports = Router;
