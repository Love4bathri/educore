const express = require("express");
const role = require("../model/rolemodel.js");

const route = express.Router();
// get all data for role
route.get("/role", async (req,res)=>{
    let data = await role.find();
    res.send(data)
});

// get one data from data base
route.get("/role/:_id", async (req,res)=>{
    try{
        let data = await role.findById(req.params._id);
         res.send(data)
      }
      catch(err){
       res.status(500).send("Server error");
      }
});
// post api user
route.post("/role", async (req, res) => {
  try {
    const newUser = new role(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Server error");
  }
});
//put api users
route.put("/role/:_id", async (req, res) => {
  try {
    const updatedUser = await role.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true // very important
    });
    if (!updatedUser) return res.status(404).send("User not found");
    res.send(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Server error");
  }
});
//delete api users
 
route.delete("/role/:_id", async (req,res)=>{
    try{
        let data = await role.findByIdAndDelete(req.params._id);
         res.send("deleted successfully")
        }
      catch(err){
       res.status(500).send("Server error");
      }
});

module.exports = route;