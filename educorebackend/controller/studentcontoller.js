const express = require("express");

const student = require("../model/studentmodel.js")
const route = express.Router();

route.get("/student", async (req, res) => {
  let data = await student.find();

  res.send(data)
});
// get one data from data base
route.get("/student/:_id", async (req, res) => {
  try {
    let data = await student.findById(req.params._id);
    res.send(data)
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// post api user
route.post("/student", async (req, res) => {
  try {
    const { firstName, lastName, emailId, collegeId, mobileNo } = req.body;
    if (!firstName || !lastName || !emailId || !collegeId || !mobileNo
    ) {
    return res.status(401).json({ message: "all field are required" })
    }
 
    const newUser = new student(req.body);
    await newUser.save();
    res.status(201).json({ message: "student detail created" }, newUser);
  } catch (err) {

    res.status(500).send("Server error");
  }
});
//put api users
route.put("/student/:_id", async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.emailId || !req.body.collegeId || !req.body.mobileNo) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedUser = await student.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true // very important
    });
     
    res.send(updatedUser);
  } catch (err) {
     
    res.status(500).json("Server error");
  }
});
//delete api users

route.delete("/student/:_id", async (req, res) => {
  try {
    let data = await student.findByIdAndDelete(req.params._id);
    res.send("deleted successfully")
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// student search api 
route.get("/student/:key", async (req, res) => {
  try {
    console.log("Searching for:", req.params.key);  // debug log

    let data = await student.find({
      $or: [
        { firstName: { $regex: req.params.key, $options: "i" } }
      ]
    });

    res.send(data);
  } catch (err) {
    console.error("Search error:", err);  // show real error
    res.status(500).send("Server Error");
  }
});


module.exports = route;