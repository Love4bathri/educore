const { default: mongoose } = require("mongoose");

const collegeschema =new mongoose.Schema({
    collegeName : {
        type :String,
        require :[true ,"college name require"]
    },
    address : {
      type :  String
     },
    city : {
     type:  String
 },
    mobileNo : {
      type:  Number,
       require :[true ,"college name require"]
    }
})
const collegeapi = mongoose.model("college", collegeschema);

module.exports = collegeapi;