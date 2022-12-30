import fs from "fs";
import path from "path";
import supertest from "supertest";
import app from "../index";

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

  it("tests if the image is processed and returned successfully. Gets an image buffer", async () => {
    const outImagePath = path.resolve(
      __dirname,
      "../assets/thumb/palmtunnel_thumb.jpg"
    );
    if (fs.existsSync(outImagePath)) {
      fs.unlink(outImagePath, (err) => {
        if (err) throw err;
      });
    }
    await request.get(
      "/api/images?filename=palmtunnel&width=100&height=100"
    );
    expect(fs.existsSync(outImagePath)).toBe(true);
  });
});
