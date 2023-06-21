const { Food } = require("../../db");

module.exports = putFood = async (req, res) => {
  try {
    const {
      id,
      name,
      image,
      qualification,
      amount,
      available,
      type,
      fat,
      sodium,
      sugar,
      price,
      description,
      discount,
      review,
      active,
    } = req.body;
    if (id) {
      console.log(id)
      const food = await Food.update(
        {
          name,
          image,
          qualification,
          amount,
          available,
          type,
          fat,
          sodium,
          sugar,
          price,
          description,
          discount,
          review,
          active,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (food[0] == 1) {
        return res.status(200).json({ message: "Updated information" });
      }
      return res.status(400).json({ message: "food not found" });
    } else {
      return res.status(400).json({ message: "Requires id" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
