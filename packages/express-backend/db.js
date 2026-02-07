import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
let connection;


const connectDB = async () => {
  if (!connection) {
    //console.log("MongoDB url thing: "+url)
    connection = await mongoose.connect(url);
    return connection;
  }
};

export default connectDB;