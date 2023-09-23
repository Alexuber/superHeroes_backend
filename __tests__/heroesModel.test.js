const { Hero, schemas } = require("../models/heroes");
const mongoose = require("mongoose");

describe("Hero Model", () => {
  beforeAll(async () => {
    expect(mongoose.connection.readyState).toBe(1);
    await mongoose.connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create and save a new hero", async () => {
    const validHeroData = {
      _id: "650de864df3f1d58964d2d78",
      nickname: "Superman",
      real_name: "Kent Clark",
      origin_description: "From Crypton",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["images/images[]_1695410268028-602931247.jpg"],
    };

    const hero = new Hero(validHeroData);
    const savedHero = await hero.save();

    expect(savedHero._id).toBeDefined();
    expect(savedHero.nickname).toBe(validHeroData.nickname);
  });

  it("should fail to save a hero with invalid data", async () => {
    const invalidHeroData = {
      nickname: "Superman",
      real_name: "Kent Clark",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["image.jpg"],
    };

    const hero = new Hero(invalidHeroData);

    try {
      await hero.save();
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toContain("validation failed");
    }
  });

  it("should validate heroAddSchema correctly", () => {
    const validData = {
      _id: "650de864df3f1d58964d2d78",
      nickname: "Superman",
      real_name: "Kent Clark",
      origin_description: "From Crypton",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["images/images[]_1695410268028-602931247.jpg"],
    };

    const result = schemas.heroAddSchema.validate(validData);

    expect(result.error).toBeNull();
  });

  it("should fail validation for invalid data", () => {
    const invalidData = {
      nickname: "Superman",
      real_name: "Kent Clark",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["image.jpg"],
    };

    const result = schemas.heroAddSchema.validate(invalidData);

    expect(result.error).toBeDefined();
  });
});
