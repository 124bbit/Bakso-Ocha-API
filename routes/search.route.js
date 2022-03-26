const express = require("express");
const Search = require("../controllers/search.controller.js");
const Router = express.Router();

Router.get("/query", Search.searchingQuery);
Router.get("/querySlug", Search.searchingSlug);
module.exports = Router;
