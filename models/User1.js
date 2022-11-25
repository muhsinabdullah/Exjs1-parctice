const mongoose =require("mongoose");
const { Schema }= mongoose;

const User1Schema = new Schema({
    Name : String,
    Email: String,
    Phone: String,
    Address: String,
    Password: String,
});

const User1 = mongoose.model("User1", User1Schema);

module.exports= User1;