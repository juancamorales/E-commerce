async function userValidate(req, res, next) {
  const { mail, roll, telephone, direction, name } = req.body;

  if (!mail) return res.status(400).json({ msg: "Email is required!" });
  /* if (!roll) return res.status(400).json({ msg: "Roll is required!" }); */
  if (name && name.length < 3)
    return res.status(400).json({ msg: "The name is too short" });
  if (name && name.length > 50)
    return res.status(400).json({ msg: "The name is too large" });

  if (telephone && telephone.length < 9)
    return res.status(400).json({ msg: "Phone number is too short" });
  if (telephone && telephone.length > 18)
    return res.status(400).json({ msg: "Phone number is too large" });

  if (direction && direction.length < 9)
    return res.status(400).json({ msg: "Your adress is too short" });
  if (direction && direction.length > 50)
    return res.status(400).json({ msg: "Your adress is too large" });

  next();
}
module.exports = userValidate;
