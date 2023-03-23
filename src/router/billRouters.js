const { Router } = require("express");
const billRouter = Router();
const nodemail = require("../mail/emailer.js");

const getBills = require("../controllers/billControllers/getBills");
const postBill = require("../controllers/billControllers/postBill");
const putBill = require("../controllers/billControllers/putBill");

billRouter.get("/", getBills);
billRouter.post("/", postBill);
billRouter.put("/", putBill, nodemail);

module.exports = billRouter;
