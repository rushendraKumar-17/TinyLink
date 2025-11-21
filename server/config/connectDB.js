import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const response = await mongoose.connect("mongodb://pvkreddy2003:pvkr2003@ac-uatvnzj-shard-00-00.oo6lmbz.mongodb.net:27017,ac-uatvnzj-shard-00-01.oo6lmbz.mongodb.net:27017,ac-uatvnzj-shard-00-02.oo6lmbz.mongodb.net:27017/job-portal?ssl=true&replicaSet=atlas-k94kz4-shard-0&authSource=admin&retryWrites=true&w=majority/TinyLink");

        console.log("Connected to database");
        
    } catch (e) {
        console.log(e);
    }
}
export default connectDB;