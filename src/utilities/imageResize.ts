import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

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

  const imagePath = path.resolve(__dirname, `../assets/full/${filename}.jpg`);
  const outImagePath = path.resolve(
    __dirname,
    `../assets/thumb/${filename}_thumb.jpg`
  );

  // Using sharp to resize the image.
  if (fs.existsSync(outImagePath)) {
    console.log("File already resized");
  } else if (fs.existsSync(imagePath)) {
    process.nextTick(() => {
      sharp(imagePath)
        .rotate()
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(outImagePath, () => {
          console.log("File was resized successfully");
          res.sendFile(outImagePath);
        });
    });
  } else {
    console.error("File does not exist");
    res.send("Failed to get Image, check if Image exists and try again.");
  }

  next();
}

export default imageResize;
