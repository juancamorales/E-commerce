const { Bill, User, Food } = require("../../db");
const { Op } = require("sequelize");

module.exports = putBill = async (req, res, next) => {
  try {
    const { qualify, paid, idUsario } = req.body;
    if(idUsario) {
      const user = await User.findAll({
        where: { id: idUsario },
        include: Bill,
      });
      const bill = user[0].bills[user[0].bills.length - 1];
      bill.update({ paid: paid, qualify:qualify });
      /* mailer */
      //////////////////////////////////////////////////////////
      let billInfo = bill;
      let userInfo = await User.findByPk(billInfo.userId);
      let foodInfo = await Food.findAll({
        where: { id: billInfo.products },
      });
      let products = foodInfo.map((e) => e.name);
      req.body.time = new Date().toString()
      req.body.mail = userInfo.mail;
      req.body.name = userInfo.name;
      req.body.billId = billInfo.billId;
      req.body.products = products.join(", ")
      req.body.value = billInfo.value;
      req.body.discount = billInfo.discount;
      req.body.mailType = "pay";
      ////////////////////////////////////////////////////////////
      return res.status(200).json({ message: "Updated information" }), next();
    } else {
      return res.status(400).json({ message: "Requires id" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
