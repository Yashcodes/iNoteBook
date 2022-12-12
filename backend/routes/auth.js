const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Yashis@agood$boy";

//! Create a User using : POST "api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    //! Validating the inputs of user using express-validator

    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    console.log(req.body);

    //* Validation error resolve : If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //! Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      //* Tut 49 : Hashing the password using bcryptjs

      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      //! Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      //! Authenticating user by "authentication token" using "JSONWebToken (JWT)" :::: Using authToken here to send the response to user

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET); //* authToken = authentication token to validate user from the server and database :::: Acts synchronously
      console.log("token is : " + authToken);

      // res.json(user); //* Sending response to work fine
      res.json({ authToken });

      //! Catch errors to make app to not crash
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//! Authenticate a User using : POST "api/auth/login". No login required

router.post(
  "/login",
  [ 
    //? Express-Validator Starts
    //! Validating the inputs of user using express-validator

    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //! If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    //? Express-Validator ended

    //! Checking that the user is present in the database or not

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        }, 
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
