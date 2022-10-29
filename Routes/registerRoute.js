const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const knex = require("knex");
const { db } = require("../database");

router.post("/", (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      phoneNumber,
      hostel,
      gender,
      maritalStatus,
      age,
      occupation,
      disabilities,
      nextOfKinName,
      nextOfKinEmail,
      nextOfKinPhoneNumber,
      nextOfKinAddress,
    } = req.body;

    db.select("email")
    .from("users")
    .where("email", "=", email)
    .then((data) => {
      if (data && data.length) {
          return res.status(400).json({msg: `The email ${email} is already in use... try with another`,});
      } else {
        const hash = bcrypt.hashSync(password, 10);
        db.transaction((trx) => {
          trx.insert({
              hash: hash,
              email: email,
            })
            .into("signedIn")
            .returning("email")
            .then((loginEmail) => {
              return trx("users")
                .returning("*")
                .insert({
                  email: loginEmail[0].email,
                  fullname: fullname,
                  phoneNumber: phoneNumber,
                  hostel: hostel,
                  gender: gender,
                  maritalStatus: maritalStatus,
                  age: age,
                  occupation: occupation,
                  disabilities: disabilities,
                  nextOfKinName: nextOfKinName,
                  nextOfKinEmail: nextOfKinEmail,
                  nextOfKinPhoneNumber: nextOfKinPhoneNumber,
                  nextOfKinAddress: nextOfKinAddress,
                })
                .then((users) => {
                  res.json(users[0]);
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        }).catch((err) => res.status(400).json("Unable to register user"));
      }
    });
} catch (err) {
  console.log(err.message);
}
});

module.exports = router;
