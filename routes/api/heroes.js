const express = require("express");
const router = express.Router();
const heroesController = require("../../controllers/hero-controller");
const { validateBody } = require("../../utils/validateBody");
const { schemas } = require("../../models/heroes");
const { upload, isValidId } = require("../../middlewares");

router.get("/", heroesController.getAllHeroes);

router.get("/:heroId", isValidId, heroesController.getHeroById);

router.post(
  "/",
  upload.array("avatar", 10),
  validateBody(schemas.heroAddSchema),
  heroesController.addNewHero
);

router.delete("/:heroId", isValidId, heroesController.deleteHero);

router.put(
  "/:heroId",
  isValidId,
  validateBody(schemas.heroAddSchema),
  heroesController.editHero
);

module.exports = router;
