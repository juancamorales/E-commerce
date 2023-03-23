const { Food } = require("../../db");

module.exports = getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const useSql = await Food.findAll({ where: { id: id } });
    if (useSql.length > 0) {
      return res.status(200).send(useSql);
    } else {
      return res.status(400).send({ message: "Food not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
