import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

async function connectionToDataBase(){
    
    const uri = process.env.MONGO_URI

    if (!uri) {
        throw new Error('MONGO_URI is not defined in the environment');
    }
    try {
        await mongoose.connect(uri, { dbName: process.env.DB_NAME });
        console.log({ message: "Connected to MongoDB" });
    } catch (error) {
        console.log({ message: 'Error connecting to MongoDB', error });
    }
}

export default connectionToDataBase;