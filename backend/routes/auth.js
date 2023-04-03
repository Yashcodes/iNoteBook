const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Yashis@agood$boy";

//? ROUTE 1 : USER CREATION, HASHING PASSWORD AND AUTHENTICATION USING "JWT"
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
    let success = false;

    //* Validation error resolve : If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //! Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry, a user with this email already exists",
        });
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

      // res.json(user); //* Sending response to work fine
      success = true;
      res.json({ success, authToken });

      //! Catch errors to make app to not crash
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//? ROUTE 2 : USER LOGIN AND AUTHENTICATING USER THROUGH "JWT"
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
    let success = false;
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
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials.",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

//? ROUTE 3 :
//! Getting a logged in User detail using : POST "api/auth/getUser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
