const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      `Email Not Valid`,
    ],
    validate: {
      validator: function () {
        return new Promise((res, rej) => {
          User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then((data) => {
              if (data) {
                res(false);
              } else {
                res(true);
              }
            })
            .catch((err) => {
              res(false);
            });
        });
      },
      message: "Email Already Taken.",
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        var re = /^\d{10}$/;
        return v == null || v.trim().length < 1 || re.test(v);
      },
      message: "Provided phone number is invalid.",
    },
  },
  password: {
    type: String,
    hide: true,
    min: 6,
  },
  type: {
    type: String,
    trim: true,
    enum: ["Investor", "Firm", "Agent"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
