const HttpError = require("./HttpError");

describe("HttpError", () => {
  test("create a new HttpError object with the given status and message", () => {
    const status = 404;
    const expectedMessage = "Not Found";

    const error = HttpError(status);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(expectedMessage);
    expect(error.status).toBe(status);
  });

  test("create a new HttpError object with the given status and custom message", () => {
    const status = 400;
    const customMessage = "Custom Error Message";

    const error = HttpError(status, customMessage);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(status);
  });
});
