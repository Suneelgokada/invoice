const express = require("express");

const router = express.Router();

const {
  createClient,
  getClients,
  exportClients,
  deleteClient
} = require("../controllers/clientController");


router.post("/create", createClient);

router.get("/list", getClients);

router.get("/export", exportClients);
router.delete("/delete/:id", deleteClient);

module.exports = router;