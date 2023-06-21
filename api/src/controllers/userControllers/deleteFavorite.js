const { User, Food } = require("../../db");

module.exports = deleteFavorite = async (req, res) => {
  const { idUser, idFood } = req.body;
  try {
    if (idUser && idFood) {
      const use = await User.findByPk(idUser);
      const food = await Food.findByPk(idFood);
      if (use && food) {
        await use.removeFood(food);
        return res.status(200).send({ message: "successfully deleted" });
      } else {
        return res.status(400).send({ message: "incorrect information" });
      }
    } else {
      res.status(400).send({ message: "missing data" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
