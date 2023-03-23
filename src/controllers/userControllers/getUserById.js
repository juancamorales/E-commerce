const { User, Bill, Food } = require("../../db");

module.exports = getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const useSql = await User.findAll({
      where: { id: id },
      include: [{ model: Food }, { model: Bill }],
    });
    if (useSql.length > 0) {
      res.status(200).send(useSql);
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
