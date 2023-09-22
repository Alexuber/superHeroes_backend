const { Hero } = require("../models/heroes");

async function getAllHeroes(page = 1, limit = 30) {
  const skip = (page - 1) * limit;
  return Hero.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });
}

async function getHeroById(heroId) {
  return Hero.findById(heroId);
}

async function addNewHero(heroData) {
  return Hero.create(heroData);
}

async function deleteHero(heroId) {
  return Hero.findByIdAndRemove(heroId);
}

async function editHero(heroId, newData) {
  return Hero.findByIdAndUpdate(heroId, newData, {
    new: true,
  });
}

async function deleteHeroImage(heroId, imagePath) {
  const hero = await Hero.findById(heroId);

  if (!hero) {
    throw new Error("Hero not found");
  }

  const { images } = hero;
  const index = images.findIndex((image) => image.includes(imagePath));

  if (index === -1) {
    throw new Error("Image not found for the hero");
  }

  images.splice(index, 1);
  await hero.save();
}

module.exports = {
  getAllHeroes,
  getHeroById,
  addNewHero,
  deleteHero,
  editHero,
  deleteHeroImage,
};
