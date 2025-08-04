const mongoose = require("mongoose");

const userDB = mongoose.connect('mongodb://localhost:27017/users')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

module.exports = { userDB };
