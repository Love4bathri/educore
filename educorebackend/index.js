const express = require("express");
var cors = require("cors")
 
require("./db/config.js");
const mark = require("./controller/marksheet.js")
const user = require("./controller/usercontroller.js")
const college = require("./controller/collegecontroller.js")
const role = require("./controller/rolecontroller.js")
const student = require("./controller/studentcontoller.js")
 
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", user)
app.use("/api", college)
app.use("/api", mark)
app.use("/api", role)
app.use("/api", student)
 
 

app.listen(7000 , ()=>{
    console.log("http://localhost:7000/user")
})

