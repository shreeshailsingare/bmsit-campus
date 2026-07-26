const { chatWithAI } = require("../services/aiService");

// POST /ai/chat
const chat = async (req, res) => {
  try {
    // Get message and history from frontend
    const { message, history } = req.body;

    // Validate request
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Get AI response
  const result = await chatWithAI(message, history);

    // Send response back to frontend
    res.json({
    success: true,
    reply: result.reply,
    category: result.category
});

  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while generating AI response.",
    });
  }
};

module.exports = {
  chat,
};