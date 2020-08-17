const mongoose = require("mongoose");
const OwnerSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  preferredSellDate: {
    type: Date,
  },
  additionalProperties: {
    type: Boolean,
    enum: ["Yes", "No"],
    default: "No",
  },
  lookingToRelocate: {
    type: Boolean,
    enum: ["Yes", "No"],
    default: "No",
  },
  additionalRemarks: {
    type: Boolean,
    enum: ["Yes", "No"],
    default: "No",
  },
});

const Owner = mongoose.model("owner", OwnerSchema);

module.exports = Owner;
