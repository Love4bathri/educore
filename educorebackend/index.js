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
app.use("/api", user);
app.use("/api", college);
app.use("/api", mark);
app.use("/api", role);
app.use("/api", student); 

const PORT = process.env.PORT || 7000;   // Render production ke liye
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

