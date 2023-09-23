const {
  addNewHero,
  getAllHeroes,
  getHeroById,
  deleteHero,
  editHero,
} = require("../services/heroesService");

const { Hero } = require("../models/heroes");

describe("Heroes Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new hero successfully", async () => {
    const fakeHeroData = {
      _id: "6474a937a6ae4f2cc7f12b78",
      nickname: "Empty template",
      real_name: "Empty template",
      origin_description: "Empty temlate",
      superpowers: ["Empty temlate", "Empty temlate", "Empty temlate"],
      catch_phrase: "Empty temlate",
      images: [],
    };

    const fakeCreatedHero = {
      _id: "fakeId",
      ...fakeHeroData,
    };

    jest.spyOn(Hero, "create").mockResolvedValue(fakeCreatedHero);

    const result = await addNewHero(fakeHeroData);

    expect(result).toEqual(fakeCreatedHero);
  });

  it("should get all heroes successfully", async () => {
    const fakeHeroes = [
      {
        _id: "6474a937a6ae4f2cc7f12b78",
        nickname: "Empty template",
        real_name: "Empty template",
        origin_description: "Empty temlate",
        superpowers: ["Empty temlate", "Empty temlate", "Empty temlate"],
        catch_phrase: "Empty temlate",
        images: [],
      },
      {
        _id: "650de864df3f1d58964d2d78",
        nickname: "Superman",
        real_name: "Kent Clark",
        origin_description: "From Crypton",
        superpowers: ["power", "fly"],
        catch_phrase: "I`m a superman",
        images: ["images/images[]_1695410268028-602931247.jpg"],
      },
    ];

    jest.spyOn(Hero, "find").mockResolvedValue(fakeHeroes);

    const result = await getAllHeroes();

    expect(result).toEqual(fakeHeroes);
  });

  it("should get a hero by ID successfully", async () => {
    const fakeHeroId = "fakeId";
    const fakeHero = {
      _id: "650de864df3f1d58964d2d78",
      nickname: "Superman",
      real_name: "Kent Clark",
      origin_description: "From Crypton",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["images/images[]_1695410268028-602931247.jpg"],
    };

    jest.spyOn(Hero, "findById").mockResolvedValue(fakeHero);

    const result = await getHeroById(fakeHeroId);

    expect(result).toEqual(fakeHero);
  });

  it("should edit a hero successfully", async () => {
    const fakeHeroId = "fakeId";
    const fakeNewData = {
      _id: "650de864df3f1d58964d2d78",
      nickname: "Superman",
      real_name: "Kent Clark",
      origin_description: "From Crypton",
      superpowers: ["power", "fly"],
      catch_phrase: "I`m a superman",
      images: ["images/images[]_1695410268028-602931247.jpg"],
    };

    const fakeUpdatedHero = {
      _id: fakeHeroId,
      ...fakeNewData,
    };

    jest.spyOn(Hero, "findByIdAndUpdate").mockResolvedValue(fakeUpdatedHero);

    const result = await editHero(fakeHeroId, fakeNewData);

    expect(result).toEqual(fakeUpdatedHero);
  });

  it("should handle errors gracefully", async () => {
    const fakeError = new Error("Fake error");

    jest.spyOn(Hero, "create").mockRejectedValue(fakeError);

    await expect(addNewHero({})).rejects.toThrowError(fakeError);
  });
});

describe("deleteHero function", () => {
  it("should delete a hero by ID successfully", async () => {
    const fakeHeroId = "fakeId";
    const deletedHero = {
      _id: fakeHeroId,
      name: "Fake Hero",
    };
    jest.spyOn(Hero, "findByIdAndRemove").mockResolvedValue(deletedHero);

    const result = await deleteHero(fakeHeroId);

    expect(result).toEqual(deletedHero);
    expect(Hero.findByIdAndRemove).toHaveBeenCalledWith(fakeHeroId);
  });

  it("should return null when hero is not found", async () => {
    const fakeHeroId = "nonExistentId";
    jest.spyOn(Hero, "findByIdAndRemove").mockResolvedValue(null);

    const result = await deleteHero(fakeHeroId);

    expect(result).toBeNull();
    expect(Hero.findByIdAndRemove).toHaveBeenCalledWith(fakeHeroId);
  });
});
