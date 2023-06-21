async function foodValidate(req, res, next) {
  const { name, image, discount, description, price, qualification, amount } =
    req.body;

  if (!name) return res.status(400).json({ msg: "Food name is required!" });
  if (name.length < 3)
    return res.status(400).json({ msg: "Food name is too short!" });
  if (name.length > 50)
    return res.status(400).json({ msg: "Food name is too large!" });
  if (!image) return res.status(400).json({ msg: "An image is required!" });

  if (!price) return res.status(400).json({ msg: "Price is required!" });
  if (price && price < 1)
    return res.status(400).json({ msg: "The price is not real!" });
  if (discount && discount < 1)
    return res.status(400).json({ msg: "Discount % can't be lower than 1!" });
  if (discount && discount > 99)
    return res.status(400).json({ msg: "Discount % can't be higer than 99!" });

  if (description.length < 10)
    return res
      .status(400)
      .json({ msg: "Food description can't be lower than 10 characters!" });
  if (description.length < 10)
    return res
      .status(400)
      .json({ msg: "Food description can't be lower than 10 characters!" });
  if (description.length > 300)
    return res
      .status(400)
      .json({ msg: "Food description can't be higer than 300 characters!" });

  if (qualification < 1)
    return res
      .status(400)
      .json({ msg: "Food qualification can't be lower than 1!" });
  if (qualification > 5)
    return res
      .status(400)
      .json({ msg: "Food qualification can't be higher than 5!" });

  if (amount < 1)
    return res.status(400).json({ msg: "Food amount can't be lower than 1!" });

  if (amount > 1000)
    return res.status(400).json({ msg: "That's so much food!" });

  next();
}
module.exports = foodValidate;
