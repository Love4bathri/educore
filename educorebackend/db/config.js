const mongoose = require("mongoose");
require("dotenv").config();
const userDB = mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

module.exports = { userDB };
