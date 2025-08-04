const { default: mongoose } = require("mongoose");
// user api model
const userschema = new mongoose.Schema({
  
firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters"]
  },
  loginId: {
    type: String,
    required: [true, "Email (loginId) is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [6, "Password must be at least 6 characters"]
},
  role: {
    type: String,
    enum: ["admin", "student", "teacher"], // Optional roles
    
  },
  dob: {
    type:  String,
     required: [true, "Date of birth is required"]
   
  }
});
const Users = mongoose.model("user" , userschema)
module.exports = Users;

 
