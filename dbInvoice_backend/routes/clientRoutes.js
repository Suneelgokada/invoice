const express = require("express");

const router = express.Router();

const {
  createClient,
  getClients,
  exportClients
} = require("../controllers/clientController");


router.post("/create", createClient);

router.get("/list", getClients);

router.get("/export", exportClients);


module.exports = router;