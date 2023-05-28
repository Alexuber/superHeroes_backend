const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { heroId } = req.params;

  if (!isValidObjectId(heroId)) {
    return next(HttpError(404, `${heroId} is not a valid id format!`));
  }
  next();
};

module.exports = isValidId;
