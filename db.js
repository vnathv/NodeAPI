const Mongoose = require("mongoose")

const connectionString = process.env.connectionString || "mongodb://localhost:27017/Customer";

Mongoose.connect(connectionString, (err) =>{
console.log(err)
});