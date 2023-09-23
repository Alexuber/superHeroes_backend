const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { processImages } = require("../helpers/imageHelper");

describe("processImages", () => {
  test("should process uploaded images and return an array of image URLs", async () => {
    const req = {
      files: [
        {
          path: "/fake/temp/image1.jpg",
          filename: "image1.jpg",
        },
        {
          path: "/fake/temp/image2.jpg",
          filename: "image2.jpg",
        },
      ],
    };

    const result = await processImages(req);
    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(2);

    const tempFile1Exists = await fs
      .access("/fake/temp/image1.jpg")
      .then(() => true)
      .catch(() => false);
    const tempFile2Exists = await fs
      .access("/fake/temp/image2.jpg")
      .then(() => true)
      .catch(() => false);

    expect(tempFile1Exists).toBe(false);
    expect(tempFile2Exists).toBe(false);
  }, 10000);
});
