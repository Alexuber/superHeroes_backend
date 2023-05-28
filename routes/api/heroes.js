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
  upload.array("images[]", 10),
  validateBody(schemas.heroAddSchema),
  heroesController.addNewHero
);

router.delete("/:heroId", isValidId, heroesController.deleteHero);
router.delete("/:heroId/images/:imagePath", heroesController.deleteHeroImage);
router.put(
  "/:heroId",
  isValidId,
  upload.array("images[]", 10),

  validateBody(schemas.heroAddSchema),
  heroesController.editHero
);

module.exports = router;
