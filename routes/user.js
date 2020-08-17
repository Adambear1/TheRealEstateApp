require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

router.post(
  "/create",
  [
    check("firstName", "First Name must be present").not().isEmpty(),
    check("lastName", "Last Name must be present").not().isEmpty(),
    check("phoneNumber", "Phone Number must be present").isMobilePhone(),
    check("email", "Email must be present").isEmail(),
    check("password", "Password must be present").not().isEmpty(),
  ],
  ({ body }, res) => {
    bcrypt.hash(body.password, 10, function (err, hash) {
      db.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: hash,
        type: body.type,
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });
  }
);

router.post(
  "/login",
  [
    check("email", "Email must be present").isEmail(),
    check("password", "Password must be present").not().isEmpty(),
  ],
  ({ body }, res) => {
    db.User.findOne({ email: body.email }).then((data) => {
      if (data) {
        bcrypt.compare(body.password, data.password, function (err, result) {
          if (err) throw err;
          res.json(data);
        });
      } else {
        res.json("Server Error");
      }
    });
  }
);

module.exports = router;
