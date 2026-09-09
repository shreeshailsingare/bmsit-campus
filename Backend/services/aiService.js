const Groq = require("groq-sdk");
const { getCampusContext } = require("./campusAIService");

const DEFAULT_GROQ_MODEL = "qwen/qwen3.8-27b";
const DECOMMISSIONED_GROQ_MODELS = new Set([
    "llama3-8b-8192",
    "llama-3.1-8b-instant",
]);
const configuredGroqModel = process.env.GROQ_MODEL?.trim();
const GROQ_MODEL =
    configuredGroqModel &&
    !DECOMMISSIONED_GROQ_MODELS.has(configuredGroqModel)
        ? configuredGroqModel
        : DEFAULT_GROQ_MODEL;

console.log("Groq configuration:", {
    groqApiKeyConfigured: Boolean(process.env.GROQ_API_KEY),
    configuredGroqModel: configuredGroqModel || "(not set)",
    groqModel: GROQ_MODEL,
});

if (configuredGroqModel && configuredGroqModel !== GROQ_MODEL) {
    console.warn(
        `Configured Groq model "${configuredGroqModel}" is decommissioned; using "${GROQ_MODEL}".`
    );
}

function getGroqClient() {
    const missingVariables = ["GROQ_API_KEY", "MONGO_URL"]
        .filter(variable => !process.env[variable]);

    if (missingVariables.length > 0) {
        throw new Error(
            `Missing required environment variable(s): ${missingVariables.join(", ")}.`
        );
    }

    return new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
}

async function chatWithAI(userMessage, history = []) {
    try {
        const groq = getGroqClient();
        console.log("AI request received by service:", {
            messageLength: userMessage.length,
            historyLength: history.length,
            model: GROQ_MODEL,
            groqApiKeyConfigured: Boolean(process.env.GROQ_API_KEY),
            mongoUrlConfigured: Boolean(process.env.MONGO_URL),
        });

        // Retrieve campus information
        const { context, categories } = await getCampusContext(userMessage);

        const messages = [];

        messages.push({
            role: "system",
            content: `
You are the official BMSIT Campus AI Assistant.

Use campus context whenever possible.

Campus Information:

${context}
`
        });

        // Keep only the last 8 messages to reduce latency and token usage
        const recentHistory = history.slice(-8);

        // Add previous conversation
        recentHistory.forEach(msg => {
            messages.push({
                role: msg.sender === "user"
                    ? "user"
                    : "assistant",
                content: msg.text
            });
        });

        // Add latest question
        messages.push({
            role: "user",
            content: userMessage
        });

        console.log("Calling Groq model:", GROQ_MODEL);
        const completion = await groq.chat.completions.create({
            model: GROQ_MODEL,
            messages,
            temperature: 0.5,
            max_tokens: 512
        });
        console.log("Groq API response:", completion);

        return {
            reply: completion.choices[0].message.content,
            category: categories
        };

    } catch (err) {
        console.error("Groq API error:", {
            message: err.message,
            status: err.status,
            code: err.code,
            type: err.type,
            error: err.error,
            stack: err.stack,
        });
        throw err;
    }
}

module.exports = {
    chatWithAI
};
