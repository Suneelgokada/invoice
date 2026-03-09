const Client = require("../models/client");
const Invoice = require("../models/invoice");
const XLSX = require("xlsx");


// ============================
// CREATE CLIENT
// ============================
exports.createClient = async (req, res) => {

  try {

    const { name, phone, address, joinDate, renewalDate } = req.body;

    if (!name || !phone || !address || !joinDate || !renewalDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const normalizedPhone = phone.trim();

    if (!/^[0-9]{10}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

  const join = new Date(joinDate);
const renewal = new Date(renewalDate);

const oneYearLater = new Date(join);
oneYearLater.setFullYear(join.getFullYear() + 1);

if (renewal.getTime() !== oneYearLater.getTime()) {
  return res.status(400).json({
    success: false,
    message: "Renewal date must be exactly 1 year after join date"
  });
}

    const exists = await Client.findOne({ phone: normalizedPhone });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Client already exists with this phone"
      });
    }

    const client = await Client.create({
      name,
      phone: normalizedPhone,
      address,
      joinDate,
      renewalDate
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};



// ============================
// GET CLIENTS (PAGINATION + SEARCH)
// ============================
exports.getClients = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      name: { $regex: search, $options: "i" }
    };

    const skip = (page - 1) * limit;

    const clients = await Client.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Client.countDocuments(query);

    res.json({
      success: true,
      data: clients,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};



// ============================
// CLIENT PROFILE (CLIENT + INVOICES)
// ============================
exports.getClientProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    const invoices = await Invoice.find({ clientId: id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      client,
      invoices
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};



exports.updateClient = async (req, res) => {

  try {

    const { id } = req.params;
    const { joinDate, renewalDate } = req.body;

    // Validate renewal date if dates are provided
    if (joinDate && renewalDate) {

      const join = new Date(joinDate);
      const renewal = new Date(renewalDate);

      const oneYearLater = new Date(join);
      oneYearLater.setFullYear(join.getFullYear() + 1);

      if (renewal.getTime() !== oneYearLater.getTime()) {
        return res.status(400).json({
          success: false,
          message: "Renewal date must be exactly 1 year after join date"
        });
      }

    }

    const client = await Client.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.json({
      success: true,
      message: "Client updated successfully",
      client
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};



// ============================
// DELETE CLIENT (SAFE DELETE)
// ============================
exports.deleteClient = async (req, res) => {

  try {

    const { id } = req.params;

    const invoiceExists = await Invoice.findOne({ clientId: id });

    if (invoiceExists) {
      return res.status(400).json({
        success: false,
        message: "Client has invoices. Cannot delete."
      });
    }

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

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};



// ============================
// EXPORT CLIENTS TO EXCEL
// ============================
exports.exportClients = async (req, res) => {

  try {

    const clients = await Client.find();

    const data = clients.map((c) => ({
      Name: c.name,
      Phone: c.phone,
      Address: c.address,
      JoinDate: new Date(c.joinDate).toLocaleDateString(),
      RenewalDate: new Date(c.renewalDate).toLocaleDateString()
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

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};