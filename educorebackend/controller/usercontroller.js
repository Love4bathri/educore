const users = require("../model/usermodel.js");
const express = require("express");

const route = express.Router();

// Testing
route.get("/", (req, res) => res.send("love"));
// GEt all data user api

route.get("/user", async (req, res) => {
  try {
    let data = await users.find();
    res.json({ message: "user data fetch successfuly", data })
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// get one data from data base
route.get("/user/:_id", async (req, res) => {
  try {
    let data = await users.findById(req.params._id);
    res.status(200).json({ message: "user data fetch successfuly", data })
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// post api user
route.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, loginId, password, dob } = req.body;

    console.log("REQ.BODY:", req.body); // DEBUG

    if (!firstName || !lastName || !loginId || !password || !dob) 
    {
      return res.status(401).json({ message: "All fields are required" });
    }

    const newUser = new users({ firstName, lastName, loginId, password, dob });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    console.error("Error in /user route:", err); // DEBUG
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


//put api users
route.put("/user/:_id", async (req, res) => {
  try {
    const { firstName, lastName, loginId, password, dob } = req.body;

    if (!firstName || !lastName || !loginId || !password || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let data = await users.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
})

//delete api users

route.delete("/user/:_id", async (req, res) => {
  try {
    let data = await users.findByIdAndDelete(req.params._id);
    res.send("deleted successfully")
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});

// login
route.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const { loginId, password } = req.body;

    const user = await users.findOne({ loginId, password });
    console.log(req.body)
    if (!loginId || !password) {
      return res.status(400).json({ error: 'Missing loginId or password' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid loginId or password' });
    }

    res.status(200).json({ message: 'Login successful', users });
  } catch (error) {
    res.status(500).json({ error: 'Login love failed', details: error.message });
  }
})

//export
module.exports = route;

