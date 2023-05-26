const fs = require("fs/promises");
const path = require("path");
const ctrlWrapper = require("../utils/ctrlWrapper");
const Jimp = require("jimp");

const { Hero } = require("../models/heroes");
// const avatarDir = path.resolve("public", "avatars");

const getAllHeroes = async (req, res, next) => {
  try {
    // const { _id: owner } = req.user;

    const { page = 1, limit = 5 } = req.query;
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
    const { contactId } = req.params;
    const result = await Hero.findById(contactId);
    result ? res.json(result) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addNewHero = async (req, res, next) => {
  try {
    const { files } = req;
    const avatarDir = path.resolve("public", "images");
    const images = [];

    for (const file of files) {
      const { path: tempUpload, filename } = file;
      const resultUpload = path.join(avatarDir, filename);
      const image = await Jimp.read(tempUpload);
      image.resize(1280, 720).quality(60).write(resultUpload);
      await fs.unlink(tempUpload);
      const imageURL = path.join("image", filename);
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
    const { contactId } = req.params;
    const result = await Hero.findByIdAndRemove(contactId);
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
    const { contactId } = req.params;
    if (JSON.stringify(req.body) === "{}") {
      return res.status(400).json({ message: `missing fields` });
    }
    const result = await Hero.findByIdAndUpdate({ _id: contactId }, req.body, {
      new: true,
    });
    res.json(result);
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
};
