const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const heroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set name for superhero"],
    },
    real_name: {
      type: String,
      required: [true, "Set real name for superhero"],
    },
    origin_description: {
      type: String,
      required: [true, "Set description for superhero"],
    },
    superpowers: {
      type: [String],
      default: [],
      required: [true, "Set superpowers for superhero"],
    },
    catch_phrase: {
      type: String,
      require: true,
      required: [true, "Set catch phrase for superhero"],
    },
    images: {
      type: [String],
      default: [],
      required: [true, "Set at least one image for superhero"],
    },
  },
  { versionKey: false, timestamps: true }
);

const heroAddSchema = Joi.object({
  nickname: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "missing required nickname field" }),
  real_name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "missing required real_name field" }),
  origin_description: Joi.string()
    .min(3)
    .max(300)
    .required()
    .messages({ "any.required": "missing required origin_description field" }),
  catch_phrase: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({ "any.required": "missing required catch_phrase field" }),
  superpowers: Joi.array()
    .items(Joi.string().min(3).max(100))
    .required()
    .messages({ "any.required": "missing required superpowers field" }),
  // images: Joi.array()
  // .items(Joi.string())
  // .required()
  // .messages({ "any.required": "missing required images field" }),
});

// const contactUpdateSchema = Joi.object({
//   name: Joi.string().min(3).max(30),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//   }),
//   phone: [Joi.string(), Joi.number().min(10).max(15)],
//   favorite: Joi.boolean(),
// });

// const contactUpdateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean()
//     .required()
//     .messages({ "any.required": "missing field favorite" }),
// });

const schemas = {
  heroAddSchema,
  // contactUpdateSchema,
  // contactUpdateFavoriteSchema,
};

heroSchema.post("save", handleMongooseError);

const Hero = model("hero", heroSchema);

module.exports = { Hero, schemas };
