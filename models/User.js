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
      `Please Fill Valid Email Address`,
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
      message: "Email Already Taken",
    },
  },
  password: {
    type: String,
  },
  userName: {
    type: String,
    trim: true,
    validate: {
      validator: function () {
        return new Promise((res, rej) => {
          User.findOne({ userName: this.userName, _id: { $ne: this._id } })
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
      message: "Username Already Taken",
    },
  },
  type: {
    type: String,
    trim: true,
    enum: ["Investor", "Firm", "Agent"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
