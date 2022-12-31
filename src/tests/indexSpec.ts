import supertest from "supertest";
import path from "path";
import fs from "fs";

import app from "../index";
import sharpFunc from "../utilities/sharpFunc";

const request = supertest(app);

describe("Test endpoint responses", () => {
  it("gets the api endpoint for home directory", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("gets an empty object if no query string is passed.", async () => {
    const response = await request.get("/api/images");
    expect(response.body).toEqual({});
  });

  it("processes the full image and saves the thumb image to disk.", async () => {
    const outImagePath = path.resolve(
      __dirname,
      "../assets/thumb/palmtunnel-100-100.jpg"
    );
    if (fs.existsSync(outImagePath)) {
      fs.unlink(outImagePath, (err) => {
        if (err) throw err;
      });
    }
    await request.get("/api/images?filename=palmtunnel&width=100&height=100");
    expect(fs.existsSync(outImagePath)).toBe(true);
  });
});

describe("Test image processing function", () => {
  const outImagePath = path.resolve(
    __dirname,
    "../assets/thumb/palmtunnel-100-100.jpg"
  );
  const imagePath = path.resolve(__dirname, "../assets/full/palmtunnel.jpg");

  it("should resize the image and save it to outImagePath", async () => {
    // Remove Image if it already exists.
    if (fs.existsSync(outImagePath)) {
      fs.unlink(outImagePath, (err) => {
        if (err) throw err;
      });
    }
    const path = sharpFunc(imagePath, outImagePath, 100, 100);
    if (typeof path === "string") {
      // setTimeout - sharpFunc takes time to save the image.
      setTimeout(() => {
        expect(fs.existsSync(path)).toBe(true);
      }, 1000);
    }
  });
});
