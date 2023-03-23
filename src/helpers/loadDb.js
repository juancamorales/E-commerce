const { Food } = require("../db.js");
const data = require("./dbPreload.js");

const loadDb = async () => {
  try {
    const checkFoods = await Food.findAll();
    if (!checkFoods.length) {
      let db = data;

      formatDb = db.map((e) => {
        return {
          name: e.name,
          id: e.id,
          image: e.image,
          reviews: e.reviews ? e.reviews.map((e) => e) : [],
          discount: e.discount,
          description: e.description,
          price: e.price,
          sugar: e.sugar,
          sodium: e.sodium,
          fat: e.fat,
          type: e.type,
          available: e.available,
          qualification: e.qualification,
          amount: e.amount,
        };
      });

      await Food.bulkCreate(formatDb);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = loadDb;
