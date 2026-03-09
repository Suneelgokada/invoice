const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },

  joinDate: {
    type: Date,
    required: true
  },

  renewalDate: {
    type: Date,
    required: true
  },

  // 🔵 Additional optional fields
  projectName: {
    type: String,
    default: ""
  },

  workType: {
    type: String,
    default: ""
  },

  domainDetails: {
    type: String,
    default: ""
  },

  credentials: {
    type: String,
    default: ""
  },

  comment: {
    type: String,
    default: ""
  },

  referredBy: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
}
);

// indexes
clientSchema.index({ phone: 1 });
clientSchema.index({ renewalDate: 1 });

module.exports = mongoose.model("Client", clientSchema);