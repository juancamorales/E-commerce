const { Router } = require("express");
const foodRouter = Router();
const foodValidate = require("../middlewares/validations/foodValidate.js");

const getFoods = require("../controllers/foodControllers/getFoods.js");
const getFoodById = require("../controllers/foodControllers/getFoodById");
const postFood = require("../controllers/foodControllers/postFood.js");
const deleteFood = require("../controllers/foodControllers/deleteFood.js");
const putFood = require("../controllers/foodControllers/putFood.js");

foodRouter.get("/", getFoods);
foodRouter.get("/:id", getFoodById);
foodRouter.post("/", foodValidate, postFood);
foodRouter.delete("/:id", deleteFood);
foodRouter.put("/", putFood);

module.exports = foodRouter;
