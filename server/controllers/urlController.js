import userModel from "../models/userModel.js";
import urlModel from "../models/urlModel.js";
import { customAlphabet } from "nanoid";

const generateShortUrl = async (req, res) => {
  const alphabet =
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 8);
  try {
    const { url, title,shortCode } = req.body;
    // console.log(req.body);
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urlExist = user.urls.find((u) => u.targetUrl === url);
    if (urlExist) {
      return res
        .status(409)
        .json({ message: "This URL already has a short URL" });
    }
    let urlGivenByUserTaken = await urlModel.findOne({shortUrl:shortCode}) ||  false;
    if(urlGivenByUserTaken){
      return res.status(404).json({message:"This short url is already in use"})
    }
    let shortUrl = nanoid();
    let shortUrlTaken = (await urlModel.findOne({ targetUrl: url })) || false;
    while (shortUrlTaken) {
      shortUrl = nanoid();
      shortUrlTaken = await urlModel.findOne({ shortUrl });
    }
    // console.log(shortUrl);
    user.urls.push({ shortUrl, targetUrl: url, title });
    urlModel.create({ shortUrl, targetUrl: url, title, owner: user._id });
    await user.save();

    res
      .status(201)
      .json({ shortUrl, message: "Short url generated successfully" });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUrls = async (req, res) => {
  const user = req.user;

  res.status(200).json({ urls: user.urls });
};

const redirectShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log("Received short URL:", shortUrl); // Log the received short URL

    const urlRecord = await urlModel.findOne({ shortUrl });

    console.log("Found URL record:", urlRecord); // Log the found URL record

    if (!urlRecord) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    urlRecord.visitHistory.push({ timestamp: Date.now() });
    await urlRecord.save();
    console.log("Saving the visit");
    res.redirect(urlRecord.targetUrl);
  } catch (error) {
    console.error("Error in redirecting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urlIndex = user.urls.findIndex((u) => String(u._id) === id);
    if (urlIndex === -1) {
      return res.status(404).send("Url not found");
    }
    const shortUrl = user.urls[urlIndex].shortUrl;
    await urlModel.findOneAndDelete({ shortUrl });

    if (urlIndex === -1) {
      return res.status(404).send("URL not found");
    }

    user.urls.splice(urlIndex, 1);

    await user.save();

    res.status(200).json({ message: "URL successfully deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

export default {
  deleteShortUrl,
  generateShortUrl,
  redirectShortUrl,
  getUrls,
};
