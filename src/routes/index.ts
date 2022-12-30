import express from "express";
import path from "path";
import fs from "fs";
import imageResize from "../utilities/imageResize";

const routes = express.Router();

// Route to get the image.
routes.get("/images", imageResize, (req, res) => {
  const filename = req.query.filename as string;

  const outImagePath = path.resolve(
    __dirname,
    `../assets/thumb/${filename}_thumb.jpg`
  );

  if (fs.existsSync(outImagePath)) {
    res.sendFile(outImagePath);
  }
});

export default routes;
