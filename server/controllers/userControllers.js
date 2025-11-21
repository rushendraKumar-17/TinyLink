import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const SECRET = "@rushendra17";
export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { uname, email, password } = req.body;

    if (!uname || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are mandatory" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      uname,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res
      .status(400)
      .json({ error: true, message: "Please provide the all the credentials" });
  else {
    const user = await userModel.findOne({ email });
    if (!user)
      res.status(404).json({
        error: true,
        message: "Please create an account first before signing in",
      });
    else {
      const passwordMatch = await bcrypt.compare(password,user.password);
      // console.log(password,user.password); TODO remove
      if (passwordMatch) {
        const payload = {
          name: user.uname,
          email,
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: "100d" });
        res.status(200).json({ token, user: { name: user.uname, email } });
      } else {
        res.status(400).json({"error":"true","message":"Invalid credentials"});
      }
    }
  }
};

export const verifyToken = async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    try{
    const decoded = jwt.verify(token, SECRET);
    const { email, password } = decoded;
    
    const userExists = await userModel.findOne({ email });
    if (userExists ) {
      res.status(200).json({ name: userExists.uname, email });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  }
  catch(e){
    return res.status(400).json({error:true,message:"Token validation failed"});
  }
  } else {
    res.status(400).json({ message: "No token found" });
  }
};
