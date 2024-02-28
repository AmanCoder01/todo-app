import mongoose from "mongoose";
const DB_NAME = "todo_app";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://aman01:aman01@cluster0.pkrjxvq.mongodb.net/${DB_NAME}`);
        console.log("MongoDB connected:", connectionInstance.connection.host);
    } catch (error) {
        console.log("ERROR", error);
        process.exit(1);
    }
}

export default connectDB;

