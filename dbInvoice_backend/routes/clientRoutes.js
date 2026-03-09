const express = require("express");
const router = express.Router();

const {
  createClient,
  getClients,
  getClientProfile,
  updateClient,
  deleteClient,
  exportClients
} = require("../controllers/clientController");

router.post("/create", createClient);
router.get("/list", getClients);
router.get("/profile/:id", getClientProfile);
router.put("/update/:id", updateClient);
router.delete("/delete/:id", deleteClient);
router.get("/export", exportClients);

module.exports = router;