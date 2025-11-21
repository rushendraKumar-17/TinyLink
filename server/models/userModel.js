import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },
    title:{
        type: String
    },
    visitHistory: {
        type: [Date],
        default: []
    }
}, {
    timestamps: true
});
const qrSchema = new mongoose.Schema({
    qrCode: {
        type: String,
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },
    title: {
        type: String
    }
})
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    urls: {
        type: [urlSchema],
        default: []
    },
    qrCodes: {
        type: [qrSchema],
        default: []
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
