const Client = require("../models/client");
const XLSX = require("xlsx");


exports.createClient = async (req, res) => {

  try {

    const { name, phone, address, joinDate, renewalDate } = req.body;

    if (!name || !phone || !address || !joinDate || !renewalDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (new Date(renewalDate) <= new Date(joinDate)) {
      return res.status(400).json({
        success: false,
        message: "Renewal date must be greater than join date"
      });
    }

    const existingClient = await Client.findOne({ phone });

    if (existingClient) {
      return res.status(409).json({
        success: false,
        message: "Client with this phone already exists"
      });
    }

    const client = new Client({
      name,
      phone,
      address,
      joinDate,
      renewalDate
    });

    await client.save();

    res.status(201).json({
      success: true,
      data: client
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



exports.getClients = async (req, res) => {

  try {

    const clients = await Client.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: clients
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



exports.exportClients = async (req, res) => {

  try {

    const clients = await Client.find();

    const data = clients.map((c) => ({
      Name: c.name,
      Phone: c.phone,
      Address: c.address,
      JoinDate: c.joinDate,
      RenewalDate: c.renewalDate
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=clients.xlsx"
    );

    res.send(buffer);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.deleteClient = async (req, res) => {

  try {

    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.json({
      success: true,
      message: "Client deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};