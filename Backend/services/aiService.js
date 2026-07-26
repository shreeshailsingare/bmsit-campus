const Groq = require("groq-sdk");
const { getCampusContext } = require("./campusAIService");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function chatWithAI(userMessage, history = []) {
    try {

        // Retrieve campus information
        const { context, category } = await getCampusContext(userMessage);

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

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages,
            temperature: 0.5,
            max_tokens: 1024
        });

        return {
            reply: completion.choices[0].message.content,
            category
        };

    } catch (err) {

        console.error(err);

        throw new Error("Unable to generate AI response.");
    }
}

module.exports = {
    chatWithAI
};