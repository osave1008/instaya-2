const mongoose = require('mongoose');
const schemaUsers = new mongoose.Schema({
    name : String,
    username : String,
    email : String,
    password : String
    
});
const User = mongoose.model("User", schemaUsers);

module.exports = User;