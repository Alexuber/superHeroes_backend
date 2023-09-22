const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

async function processImages(req) {
  const { files } = req;
  const destinationDir = path.resolve("public", "images");

  const images = [];

  for (const file of files) {
    const { path: tempUpload, filename } = file;
    const resultUpload = path.join(destinationDir, filename);
    const image = await Jimp.read(tempUpload);
    image.resize(1280, 720).quality(60).write(resultUpload);
    await fs.unlink(tempUpload);
    const imageURL = path.join("images", filename);
    images.push(imageURL);
  }

  return images;
}

module.exports = {
  processImages,
};
