const fs = require("fs/promises");
const path = require("path");
const ctrlWrapper = require("../utils/ctrlWrapper");
const Jimp = require("jimp");

const { Hero } = require("../models/heroes");
// const avatarDir = path.resolve("public", "avatars");

const getAllHeroes = async (req, res, next) => {
  try {
    // const { _id: owner } = req.user;

    const { page = 1, limit = 30 } = req.query;
    const skip = (page - 1) * limit;
    // const query = { owner };
    // if (favorite !== undefined) {
    //   query.favorite = favorite;
    // }
    const result = await Hero.find({}, "-createdAt -updatedAt", {
      skip,
      limit,
    });
    // .populate("owner", "name number");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getHeroById = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const result = await Hero.findById(heroId);
    result ? res.json(result) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addNewHero = async (req, res, next) => {
  try {
    const { files } = req;
    const imageDir = path.resolve("public", "images");
    const images = [];

    for (const file of files) {
      const { path: tempUpload, filename } = file;
      const resultUpload = path.join(imageDir, filename);
      const image = await Jimp.read(tempUpload);
      image.resize(1280, 720).quality(60).write(resultUpload);
      await fs.unlink(tempUpload);
      const imageURL = path.join("images", filename);
      images.push(imageURL);
    }

    const result = await Hero.create({
      ...req.body,
      images,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;

    const result = await Hero.findByIdAndRemove(heroId);

    result
      ? res.status(200).json({
          message: "superhero deleted",
        })
      : res.status(404).json({
          message: "Not found",
        });
  } catch (error) {
    next(error);
  }
};

const editHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;

    if (JSON.stringify(req.body) === "{}") {
      return res.status(400).json({ message: `missing fields` });
    }

    if (req.files && req.files.length > 0) {
      const { files } = req;
      const imageDir = path.resolve("public", "images");
      const images = [];

      for (const file of files) {
        const { path: tempUpload, filename } = file;
        const resultUpload = path.join(imageDir, filename);
        const image = await Jimp.read(tempUpload);
        image.resize(1280, 720).quality(60).write(resultUpload);
        await fs.unlink(tempUpload);
        const imageURL = path.join("images", filename);
        images.push(imageURL);
      }

      req.body.images = images;
    }

    const result = await Hero.findByIdAndUpdate({ _id: heroId }, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteHeroImage = async (req, res, next) => {
  try {
    const { heroId, imagePath } = req.params;
    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    const { images } = hero;

    const index = images.findIndex((image) => image.includes(imagePath));
    if (index === -1) {
      return res.status(404).json({ message: "Image not found for the hero" });
    }

    images.splice(index, 1);

    await hero.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHeroes: ctrlWrapper(getAllHeroes),
  addNewHero: ctrlWrapper(addNewHero),
  getHeroById: ctrlWrapper(getHeroById),
  editHero: ctrlWrapper(editHero),
  deleteHero: ctrlWrapper(deleteHero),
  deleteHeroImage: ctrlWrapper(deleteHeroImage),
};
