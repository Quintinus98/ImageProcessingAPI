import express from "express";
import path from "path";
import fs from "fs";
import sharpFunc from "./sharpFunc";

function imageResize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const data = req.query;

  // Info from Query string.
  const filename = data.filename as string;
  const width = parseInt(data.width as string);
  const height = parseInt(data.height as string);

  // Image paths for input and output.
  const imagePath = path.resolve(__dirname, `../assets/full/${filename}.jpg`);
  const outImagePath = path.resolve(
    __dirname,
    `../assets/thumb/${filename}_thumb.jpg`
  );

  // Check if width and height are positive numbers (not necessarily Integers -
  // since sharp converts float to integers).
  if (
    width <= 0 ||
    height <= 0 ||
    Number.isNaN(width) ||
    Number.isNaN(height)
  ) {
    console.error("Invalid Query string.")
    res.send("Invalid width or height parameter passed to query string.");
  }
  // Emit resized image.
  else if (fs.existsSync(outImagePath)) console.log("File already resized");
  // Resize Image if not previously resized.
  else if (fs.existsSync(imagePath))
    sharpFunc(imagePath, outImagePath, width, height, res);
  // Check if filename exists, if not throw error.
  else {
    console.error("File does not exist");
    res.send("Failed to get Image, check if Image exists and try again.");
  }

  next();
}

export default imageResize;
