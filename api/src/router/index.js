const { Router } = require("express");
const router = Router();

const foodRouter = require("./foodRouters.js");
const userRouter = require("./userRouter.js");
const billRouter = require("./billRouters.js");

const postPayment = require("../payment/index.js");

router.use("/foods", foodRouter);
router.use("/users", userRouter);
router.use("/bills", billRouter);

router.post("/payment", postPayment);

module.exports = router;
