const express = require("express");
const mark = require("../model/marksheetmodel.js");
const route = express.Router();

// get all data marksheet
route.get("/mark" , async (req,res)=>{
    let data = await mark.find();
    res.send(data);
});
//
route.get("/mark/:_id", async (req,res)=>{
    try{
        let data = await mark.findById(req.params._id);
         res.send(data)
      }
      catch(err){
       res.status(500).send("Server error");
      }
});
// post api for marksheet
route.post("/mark" , async (req, res)=>{
    let data = new mark(req.body);
   await data.save();
    res.send(data)
})
// put api for marksheet
route.put("/mark/:_id", async (req, res) => {
  try {
    const updatedUser = await mark.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true // very important
    });
    if (!updatedUser) return res.status(404).json("User not found");
    res.send(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json(err.message);
    }
    res.status(500).json("Server error");
  }
});
//delete api users
 
route.delete("/mark/:_id", async (req,res)=>{
    try{
        let data = await mark.findByIdAndDelete(req.params._id);
         res.send("deleted successfully")
        }
      catch(err){
       res.status(500).send("Server error");
      }
});


module.exports = route;