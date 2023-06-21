const { User, Food, Bill } = require("../../db");

module.exports = getUsers = async (req, res) => {
  try {
    const { mail } = req.query;
    if (mail) {
      const users = await User.findAll({
        where: { mail: mail },
        include: [{ model: Food }, { model: Bill }],
      });
      if (users[0]) {
        return res.status(200).send(users[0]);
      } else {
        return res.status(200).send({ message: "It was not found" });
      }
    } else {
      const uses = await User.findAll();
      if (uses) {
        res.status(200).send(uses);
      } else {
        res.status(400).send({ message: "No users" });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};