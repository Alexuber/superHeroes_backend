const path = require("path");
const imageHelper = require("../helpers/imageHelper");

const processHeroWithImages = async (req) => {
  const imageDir = path.resolve("public", "images");

  if (req.files && req.files.length > 0) {
    const { files } = req;
    const images = await imageHelper.processImages(files, imageDir);
    req.body.images = images;
  }
};
module.exports = {
  processHeroWithImages,
};
