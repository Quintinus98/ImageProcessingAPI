import sharp from "sharp";
import express from "express";

/**
 * 
 * @param imagePath Path of Full-sized image
 * @param outImagePath Path of Resized image
 * @param width width to resize image to
 * @param height height to resize image
 * @param res Express Response.
 */
async function sharpFunc(
  imagePath: string,
  outImagePath: string,
  width: number,
  height: number,
  res: express.Response
): Promise<void> {
  sharp(imagePath)
    .rotate()
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(outImagePath, () => {
      console.log("File was resized successfully");
      res.sendFile(outImagePath);
    });
}

export default sharpFunc;
