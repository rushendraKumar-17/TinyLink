import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./config/connectDB.js";
import urlModel from "./models/urlModel.js";
import userModel from "./models/userModel.js";
import tokenValidation from "./middleware/tokenValidation.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/healthz",(req,res)=>{
  res.send({ "ok": true, "version": "1.0" })
})
app.use(express.static(path.join(__dirname, "../client/dist")));

connectDB();
app.use(cors());
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); 
  } else {
    next();
  }
});
app.use(express.json());

const port = 8000;
app.use("/api/users", userRoutes);
app.use("/api/links",urlRoutes);
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });
// app.get("/code/:code",(req,res)=>{
  
// })
app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log("Received short URL:", shortUrl);  
    
    const urlRecord = await urlModel.findOne({ shortUrl });
    if(!urlRecord){
      return res.status(404).json({ message: "Short URL not found" });
    }
    const userRecord = await userModel.findById(urlRecord.owner);
    const userUrl = userRecord.urls.find((u) => u.shortUrl === shortUrl);
    if (!urlRecord) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    userUrl.visitHistory.push( Date.now() );
    await userRecord.save();
    res.redirect(urlRecord.targetUrl);
  } catch (error) {
    console.error("Error in redirecting:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default app;