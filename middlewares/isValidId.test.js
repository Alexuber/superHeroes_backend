const isValidId = require("./isValidId");
const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const req = {
  params: {
    heroId: "validId123",
  },
};
const res = {};
const next = jest.fn();

jest.mock("mongoose", () => ({
  isValidObjectId: jest.fn(),
}));

describe("isValidId", () => {
  test("call next if the heroId is a valid ObjectId", () => {
    isValidObjectId.mockReturnValueOnce(true);

    isValidId(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith("validId123");
    expect(next).toHaveBeenCalled();
  });

  test("call next with an error if the heroId is not a valid ObjectId", () => {
    isValidObjectId.mockReturnValueOnce(false);

    isValidId(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith("validId123");
    expect(next).toHaveBeenCalledWith(
      HttpError(404, "validId123 is not a valid id format!")
    );
  });
});
