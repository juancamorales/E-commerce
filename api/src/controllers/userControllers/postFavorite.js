const { User, Food } = require("../../db");

module.exports = postFavorite = async (req, res) => {
  const { idUser, idFood } = req.body;
  try {
    if (idUser && idFood) {
      const uses = await User.findByPk(idUser);
      const food = await Food.findByPk(idFood);
      if (uses && food) {
        await uses.addFood(food);
        return res.status(200).send({ message: "added successfully" });
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
