const { chatWithAI } = require("../services/aiService");

// POST /ai/chat
const chat = async (req, res) => {
  try {
    console.log("Incoming AI request:", {
      method: req.method,
      path: req.originalUrl,
      origin: req.headers.origin,
      body: {
        messageLength: typeof req.body?.message === "string" ? req.body.message.length : 0,
        historyLength: Array.isArray(req.body?.history) ? req.body.history.length : 0,
      },
    });

    // Get message and history from frontend
    const { message, history } = req.body;

    // Validate request
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Message is required",
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
    console.error("AI Controller Error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      error: error.error,
      stack: error.stack,
    });

    const providerMessage = error.error?.error?.message;
    const errorMessage =
      providerMessage ||
      error.message ||
      "Unable to generate AI response.";
    const statusCode =
      Number.isInteger(error.status) && error.status >= 400 && error.status < 600
        ? error.status
        : 500;

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  }
};

module.exports = {
  chat,
};