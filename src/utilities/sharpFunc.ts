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
function sharpFunc(
  imagePath: string,
  outImagePath: string,
  width: number,
  height: number,
  res?: express.Response
): void | string {
  sharp(imagePath)
    .rotate()
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(outImagePath, () => {
      // The callback waits for the outImagePath to complete
      // before calling the res.sendFile.
      if (res) res.sendFile(outImagePath);
    });

  if (!res) return outImagePath;
}

export default sharpFunc;
