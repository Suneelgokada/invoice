// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Kotha field add cheyandi
  role: { 
    type: String, 
    enum: ["admin", "employee"], 
    default: "employee" 
  }
});

module.exports = mongoose.model("Admin", adminSchema);