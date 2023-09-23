const handleMongooseError = require("../helpers/handleMongooseError");

describe("handleMongooseError", () => {
  test('set the error status to 409 if the error code is 11000 and the error name is "MongoServerError"', () => {
    const error = {
      name: "MongoServerError",
      code: 11000,
      status: undefined,
    };

    const next = jest.fn();

    handleMongooseError(error, {}, next);

    expect(error.status).toBe(409);
    expect(next).toHaveBeenCalled();
  });

  test("set the error status to 400 for other error codes and names", () => {
    const error = {
      name: "SomeError",
      code: 123,
      status: undefined,
    };

    const next = jest.fn();

    handleMongooseError(error, {}, next);

    expect(error.status).toBe(400);
    expect(next).toHaveBeenCalled();
  });
});
