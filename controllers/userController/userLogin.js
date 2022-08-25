const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const conn = require("../../dbConnection").promise();
const WindowsToaster = require("node-notifier").WindowsToaster;

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const [row] = await conn.execute("SELECT * FROM `user` WHERE `email`=?", [
      req.body.email,
    ]);

    if (row.length === 0) {
      return (
        //alert("Invalid email address")
        res.status(422).json({
          message: "Invalid email address",
        })
      );
    }

    const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    if (!passMatch) {
      return res.status(422).json({
        message: "Incorrect password",
      });
    }
    const theToken = jwt.sign({ id: row[0].id }, "the-super-secret", {
      expiresIn: "1",
    });

    return res.json({
      token: theToken,
      email: req.body.email,
    })

  } catch (err) {
    next(err);
  }
};
