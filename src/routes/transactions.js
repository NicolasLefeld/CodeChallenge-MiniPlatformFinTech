const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

router.get("/", controller.getTransactions);
router.post("/", controller.createTransaction);
router.patch("/:id/approve", controller.approveTransaction);
router.patch("/:id/reject", controller.rejectTransaction);

module.exports = router;
