const express = require("express");
const { isSignIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/payment");
const router = express.Router();

router.get("/payment/gettoken/:userId", isSignIn, isAuthenticated, getToken);
router.post(
  "/payment/braintree/:userId",
  isSignIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
