const ctrlWrapper = require("./ctrlWrapper");

describe("ctrlWrapper", () => {
  test("call the wrapped controller function and pass req, res, next arguments", async () => {
    const controller = jest.fn();
    const req = {};
    const res = {};
    const next = jest.fn();

    const wrappedCtrl = ctrlWrapper(controller);
    await wrappedCtrl(req, res, next);

    expect(controller).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  test("call next with the error if the wrapped controller function throws an error", async () => {
    const controller = jest.fn().mockRejectedValueOnce(new Error("Some error"));
    const req = {};
    const res = {};
    const next = jest.fn();

    const wrappedCtrl = ctrlWrapper(controller);
    await wrappedCtrl(req, res, next);

    expect(controller).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error("Some error"));
  });
});
