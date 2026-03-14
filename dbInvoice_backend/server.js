
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const invoiceRoutes = require("./routes/invoiceRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");
const app = express();
const helmet = require("helmet");
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.json());
// Test Route (important)
app.get("/", (req, res) => {
  res.send("Invoice Backend Running 🚀");
});

// Routes
app.use("/api/invoice", invoiceRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", purchaseRoutes);
app.use("/api/admin", clientRoutes);
app.use("/templates", express.static(path.join(__dirname, "public/templates")));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB Error:", err));