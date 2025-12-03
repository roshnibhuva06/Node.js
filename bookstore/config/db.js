import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/foodlibrary");
        console.log("MongoDB connected...!");
    } catch (err) {
        console.log("Connection Failed !", err);
    }
};

export default connectDB;
