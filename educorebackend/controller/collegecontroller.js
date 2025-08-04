const collegeapi = require("../model/collegemodel.js")
const express = require("express");
const route = express.Router();

// college api 
route.get("/college", async (req, res) => {
  try {
    let data = await collegeapi.find();
    res.send(data)
    console.log(data)
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// get one data by id 
route.get("/college/:_id", async (req, res) => {
  try {
    let data = await collegeapi.findById(req.params._id);
    res.send(data)
    console.log(data)
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// post api for college
route.post("/college", async (req, res) => {
  try {
    let data = new collegeapi(req.body);
    await data.save()
    res.send(data)
    console.log(data)
  }
  catch (err) {
    res.status(500).send("Server error");
  }
});
// put api for college
route.put("/college/:_id", async (req, res) => {
  try {
  let data = await collegeapi.findByIdAndUpdate(req.params._id, req.body ,{new :true});
    data.save()
    res.send(data)
  } catch(err){
    console.log("err college api")
  }

})
// delete api for college
route.delete("/college/:_id" , async(req,res)=>{
  let data = await collegeapi.findByIdAndDelete(req.params._id)
  res.send("deleted succesfully")
})
module.exports = route;