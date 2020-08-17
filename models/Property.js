const mongoose = require("mongoose");
const PropertySchema = mongoose.Schema({
  _Owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  _User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Address: {
    type: String,
    trim: true,
    required: true,
  },
  City: {
    type: String,
    trim: true,
    required: true,
  },
  State: {
    type: String,
    trim: true,
    required: true,
  },
  zipCode: {
    type: Number,
    trim: true,
    required: true,
  },
  houseStyle: {
    type: String,
    enum: [
      "1 Story",
      "2 Story",
      "3 Story",
      "Split Entry",
      "1.5 Story",
      "2.5 Story",
      "1 Story w/ Basement",
      "2 Story w/ Basement",
      "1.5 Story w/ Basement",
      "2.5 Story w/ Basement",
      "Multi-level",
    ],
    required: true,
  },
  houseSize: {
    type: Number,
    trim: true,
    required: true,
  },
  sizeCategory: {
    type: String,
  },
  houseAge: {
    type: Number,
    trim: true,
    required: true,
  },
  lastRemodel: {
    type: Number,
    trim: true,
  },
  payoffAmount: {
    type: Number,
    trim: true,
  },
  preferredSellPrice: {
    type: Number,
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

PropertySchema.methods.convertSize = function () {
  if (this.houseSize <= 900) {
    return (this.sizeCategory = "-900");
  } else if (this.houseSize > 901 && this.houseSize <= 1200) {
    return (this.sizeCategory = "901-1200");
  } else if (this.houseSize > 1201 && this.houseSize <= 1500) {
    return (this.sizeCategory = "1201-1500");
  } else if (this.houseSize > 1501 && this.houseSize <= 2000) {
    return (this.sizeCategory = "1501-2000");
  } else if (this.houseSize > 2001 && this.houseSize <= 2500) {
    return (this.sizeCategory = "2001-2500");
  } else if (this.houseSize > 2501) {
    return (this.sizeCategory = "2501+");
  } else {
    return (this.sizeCategory = undefined);
  }
};

const Property = mongoose.model("property", PropertySchema);

module.exports = Property;
