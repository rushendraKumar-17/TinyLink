import jwt from "jsonwebtoken";
const SECRET = "@rushendra17";
import userModel from "../models/userModel.js";
const tokenValidation = async(req,res,next)=>{
    const authHeader = req.headers['authorization']; 
      if (!authHeader) {
         return res.status(401).json({ message: "Authorization header missing" });
      }
      else{
        const token = authHeader.split(' ')[1]; 

        if (!token) {
          return res.status(401).json({ message: "Token not found" });
        }
        try{
            const decoded = jwt.verify(token,SECRET);
            const user =await userModel.findOne({email:decoded.email});
            // console.log(decoded);
            // console.log("User",user);
            req.user = user;
        }
        catch(e){
            console.log(e);
            res.status(403).send("Invalid token");
        }
      }
    next();
}
export default tokenValidation;