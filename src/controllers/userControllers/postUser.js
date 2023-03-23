const { User } = require("../../db");

module.exports = postUser = async (req, res, next) => {
  try {
    const {
      mail,
      roll,
      activename,
      telephone,
      direction,
      favorites,
      image,
      active,
      name,
    } = req.body;
    if (mail && name) {
      console.log(req.body)
      await User.create({
        name,
        mail,
        image,
        roll,
        activename,
        telephone,
        direction,
        favorites,
        active,
      });
      req.body.mailType = "newUser"; //var para recibir el tipo de mail a enviar
      return res.status(200).json({ message: "Successfully created" }), next();
    } else {
      return res.status(400).json({ message: "Name and mail is required" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
