const path = require("path");
const { processHeroWithImages } = require("../helpers/processHeroWithImages");
const imageHelper = require("../helpers/imageHelper");

jest.mock("../helpers/imageHelper", () => ({
  processImages: jest.fn(),
}));

describe("processHeroWithImages Function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should process hero images when files are present in the request", async () => {
    const req = {
      files: [{ filename: "image1.jpg" }, { filename: "image2.jpg" }],
      body: {},
    };

    imageHelper.processImages.mockResolvedValue(["image1.jpg", "image2.jpg"]);

    await processHeroWithImages(req);

    expect(req.body.images).toEqual(["image1.jpg", "image2.jpg"]);

    expect(imageHelper.processImages).toHaveBeenCalledWith(
      req.files,
      path.resolve("public", "images")
    );
  });

  it("should do nothing when no files are present in the request", async () => {
    const req = { body: {} };

    await processHeroWithImages(req);

    expect(req.body.images).toBeUndefined();

    expect(imageHelper.processImages).not.toHaveBeenCalled();
  });
});
