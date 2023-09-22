const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { processImages } = require("./imageHelper"); // Замените путь на корректный путь к вашему файлу imageHelper

describe("processImages", () => {
  test("should process uploaded images and return an array of image URLs", async () => {
    // Подготавливаем фейковые данные для теста
    const req = {
      files: [
        {
          path: "/fake/temp/image1.jpg",
          filename: "image1.jpg",
        },
        {
          path: "/fake/temp/image2.jpg",
          filename: "image2.jpg",
        },
      ],
    };

    // Вызываем функцию processImages с фейковыми данными
    const result = await processImages(req);

    // Проверяем, что результат является массивом
    expect(Array.isArray(result)).toBe(true);

    // Проверяем, что массив содержит ожидаемое количество URL-ов
    expect(result.length).toBe(2);

    // Проверяем, что URL-ы соответствуют ожидаемому формату
    const tempFile1Exists = await fs
      .access("/fake/temp/image1.jpg")
      .then(() => true)
      .catch(() => false);
    const tempFile2Exists = await fs
      .access("/fake/temp/image2.jpg")
      .then(() => true)
      .catch(() => false);

    expect(tempFile1Exists).toBe(false);
    expect(tempFile2Exists).toBe(false);
  }, 10000);
});
