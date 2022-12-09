const mongoose = require('mongoose');
// import mongoose from mongoose;

module.exports = async () => {
    try{
           const conn = await mongoose.connect(process.env.DB_URI).then(() => {
            console.log("DATABASE CONNECTED ");
        });
    }catch(e){
        console.log("DATABASE IS NOT CONNECTED " + e.message);
    }
};