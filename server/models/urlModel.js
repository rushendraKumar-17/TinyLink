import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    title:{
        type: String
    },
    shortUrl: {
        type: String,
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },
    owner:{
        type:mongoose.Types.ObjectId
    },
    visitHistory:{
        type:String
    }
}, {
    timestamps: true
});

const urlModel = mongoose.model("url", urlSchema);
export default urlModel;