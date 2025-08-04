const mongoose = require("mongoose");

const markschema = new mongoose.Schema({
    name : {
        type: String
    },
    studentId :{
        type : String
    },
    rollNo :{
        type: String
    },
    physics :{
        type : String
    },
    chemistry :{
        type : String
    },
    maths : {
        type : String
    }
});

const mark = mongoose.model("markshet" , markschema);
module.exports = mark;