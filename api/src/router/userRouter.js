const { Router } = require("express");
const userRouter = Router();
const nodemail = require("../mail/emailer.js");
const userValidate = require("../middlewares/validations/userValidate.js");

const getUsers = require("../controllers/userControllers/getUsers.js");
const getUserById = require("../controllers/userControllers/getUserById.js");
const postUser = require("../controllers/userControllers/postUser.js");
const deleteUser = require("../controllers/userControllers/deleteUser.js");
const putUser = require("../controllers/userControllers/putUser.js");

const postFavorite = require("../controllers/userControllers/postFavorite");
const deleteFavorite = require("../controllers/userControllers/deleteFavorite.js");

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", userValidate, postUser, nodemail);
userRouter.delete("/:id", deleteUser);
userRouter.put("/", putUser);

userRouter.post("/favorites", postFavorite);
userRouter.put("/favorites", deleteFavorite);

module.exports = userRouter;
