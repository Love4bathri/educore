const mongoose = require("mongoose")

const studentschema = new mongoose.Schema({
firstName :{
    type : String,
     required: [true, " is required"],

},
lastName :{
    type : String,
     required: [true, " is required"],

},
emailId :{
    type : String,
     required: [true, "Email (loginId) is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
},
collegeId :{
    type : String,
     required: [true, " is required"],

},
mobileNo :{
    type : Number,
     required: [true, " is required"],

}
});

const student = mongoose.model("student" , studentschema);
module.exports = student;