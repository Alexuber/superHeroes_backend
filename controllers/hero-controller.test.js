// const request = require("supertest");
// const app = require("../app"); // Подключите ваше Express-приложение

// describe("Heroes Controller", () => {
//   let createdHeroId; // Для хранения ID созданного героя

//   // Тест для получения всех героев
//   it("should get all heroes", async () => {
//     const response = await request(app).get("/api/heroes");
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });

//   // Тест для создания нового героя
//   it("should add a new hero", async () => {
//     const newHeroData = {
//       nickname: "Superman",
//       real_name: "Clark Kent",
//       origin_description: "The Man of Steel",
//       superpowers: ["Super strength", "Flight"],
//       catch_phrase: "Up, up, and away!",
//       images: ["superman.jpg"],
//     };

//     const response = await request(app).post("/api/heroes").send(newHeroData);

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("_id");
//     createdHeroId = response.body._id; // Сохраняем ID созданного героя
//   });

//   // Тест для получения героя по ID
//   it("should get a hero by ID", async () => {
//     const response = await request(app).get(`/api/heroes/${createdHeroId}`);
//     expect(response.status).toBe(200);
//     expect(response.body._id).toBe(createdHeroId);
//   });

//   // Тест для редактирования героя
//   it("should edit a hero", async () => {
//     const updatedHeroData = {
//       nickname: "Updated Superman",
//       real_name: "Updated Clark Kent",
//       origin_description: "Updated The Man of Steel",
//     };

//     const response = await request(app)
//       .put(`/api/heroes/${createdHeroId}`)
//       .send(updatedHeroData);

//     expect(response.status).toBe(200);
//     expect(response.body.nickname).toBe(updatedHeroData.nickname);
//     expect(response.body.real_name).toBe(updatedHeroData.real_name);
//   });

//   // Тест для удаления героя
//   it("should delete a hero", async () => {
//     const response = await request(app).delete(`/api/heroes/${createdHeroId}`);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("superhero deleted");
//   });

//   // Тест для удаления изображения героя
//   it("should delete a hero image", async () => {
//     // Предположим, что у вас есть ID героя и имя изображения для удаления
//     const heroId = createdHeroId;
//     const imageName = "superman.jpg";

//     const response = await request(app).delete(
//       `/api/heroes/${heroId}/images/${imageName}`
//     );
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Image deleted successfully");
//   });
// });
