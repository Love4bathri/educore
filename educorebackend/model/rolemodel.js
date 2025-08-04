const mongoose = require("mongoose")
const roleschema = new mongoose.Schema({
name : {
    type : String
},
discription : {
    type : String
}

})

const role = mongoose.model("roles" , roleschema);

module.exports = role 