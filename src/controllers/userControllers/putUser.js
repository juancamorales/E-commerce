const { User } = require("../../db");

module.exports = putUser = async (req, res) => {
  try {
    const {
      name,
      mail,
      roll,
      activename,
      telephone,
      direction,
      favorites,
      active,
    } = req.body;
    if (mail) {
      await User.update(
        {
          name,
          mail,
          roll,
          activename,
          telephone,
          direction,
          favorites,
          active,
        },
        {
          where: {
            mail: mail,
          },
        }
      );
      return res.status(200).json({ message: "Successfully updated" });
    } else {
      return res.status(400).json({ message: "Mail is required!" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
