const {
  getAllHeroes,
  addNewHero,
  getHeroById,
  editHero,
  deleteHero,
  deleteHeroImage,
} = require("../controllers/hero-controller");
const heroesService = require("../services/heroesService");
const imageHelper = require("../helpers/imageHelper");

describe("Heroes Controller", () => {
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
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
    jest.spyOn(heroesService, "getAllHeroes").mockResolvedValue(fakeHeroes);

    await getAllHeroes(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeHeroes);
  });

  it("should handle an error when getting all heroes", async () => {
    const fakeError = new Error("Fake error");
    jest.spyOn(heroesService, "getAllHeroes").mockRejectedValue(fakeError);

    await getAllHeroes(req, res, next);

    expect(next).toHaveBeenCalledWith(fakeError);
  });
});

describe("Add New Hero Controller", () => {
  const req = {
    body: {
      _id: "6474a937a6ae4f2cc7f12b78",
      nickname: "Empty template",
      real_name: "Empty template",
      origin_description: "Empty temlate",
      superpowers: ["Empty temlate", "Empty temlate", "Empty temlate"],
      catch_phrase: "Empty temlate",
      images: [],
    },
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new hero successfully", async () => {
    const fakeImages = ["image1.jpg", "image2.jpg"];
    const fakeHero = {
      _id: "6474a937a6ae4f2cc7f12b78",
      nickname: "Empty template",
      real_name: "Empty template",
      origin_description: "Empty temlate",
      superpowers: ["Empty temlate", "Empty temlate", "Empty temlate"],
      catch_phrase: "Empty temlate",
      images: [],
    };

    jest.spyOn(imageHelper, "processImages").mockResolvedValue(fakeImages);
    jest.spyOn(heroesService, "addNewHero").mockResolvedValue(fakeHero);

    await addNewHero(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeHero);
  });

  it("should handle an error when adding a new hero", async () => {
    const fakeImages = ["image1.jpg", "image2.jpg"];
    const fakeError = new Error("Fake error");

    jest.spyOn(imageHelper, "processImages").mockResolvedValue(fakeImages);
    jest.spyOn(heroesService, "addNewHero").mockRejectedValue(fakeError);

    await addNewHero(req, res, next);

    expect(next).toHaveBeenCalledWith(fakeError);
  });
});
