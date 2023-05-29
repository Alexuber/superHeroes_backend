const upload = require("./upload");

const req = {};
const file = {
  mimetype: "image/jpeg",
  originalname: "example.jpg",
  fieldname: "images[]",
};
const cb = jest.fn();

// fileFilter
describe("fileFilter", () => {
  test("call cb with null and true for valid file type", () => {
    upload.fileFilter(req, file, cb);

    expect(cb).toHaveBeenCalledWith(null, true);
  });

  test("call cb with an error for invalid file type", () => {
    const invalidFile = {
      mimetype: "text/plain",
    };

    upload.fileFilter(req, invalidFile, cb);

    expect(cb).toHaveBeenCalledWith(
      new Error(
        "Invalid file format. Only JPG, JPEG, PNG, and WEBP formats are allowed."
      )
    );
  });
});

// filename
describe("filename", () => {
  test("return a filename with the correct format", () => {
    const filename = upload.filename(req, file, cb);

    const regex = /^images\[\]_[0-9]+-[0-9]+\.jpg$/;
    expect(filename).toMatch(regex);
  });
});
