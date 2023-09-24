const imageHelper = require("../helpers/imageHelper");

const heroesService = require("../services/heroesService");

async function getAllHeroes(req, res, next) {
  try {
    const result = await heroesService.getAllHeroes();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

const getHeroById = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const result = await heroesService.getAllHeroes(heroId);
    result ? res.json(result) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

async function addNewHero(req, res, next) {
  try {
    const images = await imageHelper.processImages(req);

    const result = await heroesService.addNewHero({
      ...req.body,
      images,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const deleteHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const result = await heroesService.deleteHero(heroId);

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

async function editHero(req, res, next) {
  try {
    const { heroId } = req.params;

    if (JSON.stringify(req.body) === "{}") {
      return res.status(400).json({ message: `missing fields` });
    }

    if (req.files && req.files.length > 0) {
      const images = await imageHelper.processImages(req);

      req.body.images = images;
    }

    const result = await heroesService.editHero(heroId, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

const deleteHeroImage = async (req, res, next) => {
  try {
    const { id, selectedImage } = req.params;
    await heroesService.deleteHeroImage(id, selectedImage);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHeroes: getAllHeroes,
  addNewHero: addNewHero,
  getHeroById: getHeroById,
  editHero: editHero,
  deleteHero: deleteHero,
  deleteHeroImage: deleteHeroImage,
};
