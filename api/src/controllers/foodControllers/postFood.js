const { Food } = require("../../db");

module.exports = postFood = async (req, res) => {
  try {
    let {
      name,
      id,
      image,
      review,
      discount,
      description,
      price,
      sugar,
      sodium,
      fat,
      type,
      available,
      qualification,
      amount,
      favorite,
    } = req.body;
    name = name.toUpperCase();
    if (name) {
      await Food.create({
        name,
        id,
        image,
        review,
        discount,
        description,
        price,
        sugar,
        sodium,
        fat,
        type,
        available,
        qualification,
        amount,
        favorite,
      });
      return res.status(200).json({ message: "Successfully created" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
