
# Project Title - Backend

This is the backend repository for the **superHeroes_backend** application. It serves as the server-side component responsible for handling data storage, retrieval, and management for the application.

## Features

- **API Endpoints**: Provides various API endpoints for managing superhero data, including adding, editing, deleting, and fetching superheroes.
- **Data Storage**: Uses MongoDB as the database for storing superhero information.
- **Image Upload**: Supports image upload functionality for associating images with superhero profiles.
- **Validation**: Implements validation using the Joi library to ensure data integrity.
- **Error Handling**: Handles errors and provides appropriate error responses.
- **Middleware**: Uses middleware like `express.json`, `morgan`, and `cors` for request handling, logging, and cross-origin resource sharing.
- **Environment Configuration**: Uses the dotenv library to load environment variables from a `.env` file.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- Axios

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Alexuber/superHeroes_backend.git
```

2. Navigate to the project directory:

```bash
cd superHeroes_backend
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the environment variables:

Create a `.env` file in the root directory of the project and add the following variables:

```
PORT=3001
B_HOST=mongodb://localhost:27017/my-database
```

Replace `mongodb://localhost:27017/my-database` with the MongoDB connection URI for your database.

5. Start the server:

```bash
npm start or npm run dev 
```

The backend server will start running on the specified port (default: 3001).

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request describing your changes.

Please ensure that your code follows the project's coding conventions and includes appropriate tests.

## Contact

If you have any questions or suggestions, feel free to reach out to the project maintainers at [alexuberbuber@gmail.com](mailto:alexuberbuber@gmail.com).

## API Reference

### Get all heroes

```http
GET /api/heroes
```

Retrieves a list of all heroes.

#### Response

```json
[
  {
    "_id": "heroId",
    "nickname": "Superman",
    "real_name": "Clark Kent",
    "origin_description": "An alien from the planet Krypton.",
    "catch_phrase": "Truth, justice, and the American way.",
    "superpowers": ["Flight", "Super strength", "Heat vision"],
    "images": ["image1.jpg", "image2.jpg"]
  },
  {
    "_id": "heroId",
    "nickname": "Batman",
    "real_name": "Bruce Wayne",
    "origin_description": "A billionaire vigilante.",
    "catch_phrase": "I'm Batman.",
    "superpowers": ["Intelligence", "Riches", "Martial arts"],
    "images": ["image3.jpg", "image4.jpg"]
  },
  ...
]
```

### Get hero by ID

```http
GET /api/heroes/:heroId
```

Retrieves a specific hero by their ID.

#### Parameters

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `heroId`  | `string` | **Required**. ID of hero. |

#### Response

```json
{
  "_id": "heroId",
  "nickname": "Superman",
  "real_name": "Clark Kent",
  "origin_description": "An alien from the planet Krypton.",
  "catch_phrase": "Truth, justice, and the American way.",
  "superpowers": ["Flight", "Super strength", "Heat vision"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

### Add a new hero

```http
POST /api/heroes
```

Adds a new hero.

#### Request Body

| Field               | Type             | Description                                    |
| :------------------ | :--------------- | :--------------------------------------------- |
| `nickname`          | `string`         | **Required**. The hero's nickname.              |
| `real_name`         | `string`         | **Required**. The hero's real name.             |
| `origin_description`| `string`         | **Required**. The hero's origin description.    |
| `catch_phrase`      | `string`         | **Required**. The hero's catch phrase.          |
| `superpowers`       | `string` array   | **Required**. An array of the hero's superpowers.|
| `images`            | `string` array   | An array of image paths associated with the hero.|

#### Response

```json
{
  "_id": "newHeroId",
  "nickname": "Wonder Woman",
  "real_name": "Diana Prince",
  "origin_description": "Lorem ipsum dolor sit amet.",
  "catch_phrase": "A champion of truth and justice.",
  "superpowers": ["Superhuman strength", "Lasso of Truth", "Flight"],
  "images": ["image4.jpg"],
}
```

### Delete a hero

```http
DELETE /api/heroes/:heroId
```

Deletes a specific hero by their ID.

#### Parameters

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `heroId`  | `string` | **Required**. ID of hero. |

#### Response

```json
{
 "message": "superhero deleted"
}
```

### Delete a hero image

```http
DELETE /api/heroes/:heroId/images/:imagePath
```

Deletes a specific image associated with a hero.

#### Parameters

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `heroId`   | `string` | **Required**. ID of hero.

     |
| `imagePath`| `string` | **Required**. Path of the image to delete. |

#### Response

```json
{
  "message": "Image deleted successfully."
}
```

### Edit a hero

```http
PUT /api/heroes/:heroId
```

Edits a specific hero by their ID.

#### Parameters

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `heroId`  | `string` | **Required**. ID of hero. |

#### Request Body

| Field               | Type             | Description                                    |
| :------------------ | :--------------- | :--------------------------------------------- |
| `nickname`          | `string`         | **Required**. The hero's nickname.              |
| `real_name`         | `string`         | **Required**. The hero's real name.             |
| `origin_description`| `string`         | **Required**. The hero's origin description.    |
| `catch_phrase`      | `string`         | **Required**. The hero's catch phrase.          |
| `superpowers`       | `string` array   | **Required**. An array of the hero's superpowers.|
| `images`            | `string` array   | An array of image paths associated with the hero.|

#### Response

```json
{
  "_id": "newHeroId",
  "nickname": "Wonder Woman",
  "real_name": "Diana Prince",
  "origin_description": "Lorem ipsum dolor sit amet.",
  "catch_phrase": "A champion of truth and justice.",
  "superpowers": ["Superhuman strength", "Lasso of Truth", "Flight"],
  "images": ["image4.jpg"],
}
```

Please note that in the above examples, `heroId` refers to the unique ID of a hero in the database, and `image1.jpg`, `image2.jpg`, etc., represent the image file names associated with the hero.

## Error Handling

If an error occurs while processing a request, the API will return an appropriate error response with the corresponding HTTP status code and error message.

Example error response:

```json
{
  "error": "Invalid ID. Hero not found."
}
```

## License

This project is licensed under the [MIT License](LICENSE).

For more information about the project, please visit the [homepage](https://Alexuber.github.io/superHeroes/).
