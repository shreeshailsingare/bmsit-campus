const express = require("express");
const router = express.Router();

const { chat } = require("../controllers/ai");

// POST /ai/chat
router.post("/chat", chat);

module.exports = router;