const Post = require("../models/Post");

const CATEGORY_KEYWORDS = {
  Placement: [
    "placement",
    "placements",
    "job",
    "jobs",
    "hiring",
    "recruitment",
    "company",
    "package"
  ],

  Internship: [
    "internship",
    "internships",
    "intern"
  ],

  Event: [
    "event",
    "events",
    "seminar",
    "workshop",
    "session"
  ],

  Hackathon: [
    "hackathon",
    "coding contest",
    "competition"
  ],

  Sports: [
    "sports",
    "match",
    "tournament",
    "cricket",
    "football",
    "volleyball"
  ],

  Club: [
    "club",
    "clubs",
    "society"
  ],

  Library: [
    "library",
    "book",
    "books"
  ],

  Announcement: [
    "announcement",
    "notice",
    "circular",
    "important"
  ],

  Achievement: [
    "achievement",
    "award",
    "winner",
    "winners",
    "congratulations"
  ],

  Department: [
    "department",
    "ece",
    "cse",
    "ise",
    "aiml",
    "civil",
    "mechanical"
  ]
};

/**
 * Detect user intent
 */
function detectCategories(message) {

    const query = message.toLowerCase();

    const categories = [];

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {

        if (
            keywords.some(keyword => query.includes(keyword)) &&
            !categories.includes(category)
        ) {
            categories.push(category);
        }

    }

    return categories;
}

/**
 * Search MongoDB
 */
async function searchPosts(userMessage, categories) {

    const words = userMessage
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2);

    const conditions = [];

    // Category Search
    // Search every detected category
    categories.forEach(category => {
        conditions.push({
            category
        });
    });

    // Tags and Text Search (only if there are valid words)
    if (words.length > 0) {
        conditions.push({
            tags: {
                $in: words
            }
        });

        conditions.push({
            text: {
                $regex: words.join("|"),
                $options: "i"
            }
        });
    }

    const posts = await Post.find({
        $or: conditions
    })
        .populate("author", "name username")
        .sort({ createdAt: -1 });

    // ---------- Ranking ----------

    const rankedPosts = posts
        .map(post => {

            let score = 0;

            // Category Match
            if (categories.includes(post.category))
                score += 10;

            // Tag Match
            words.forEach(word => {
                if (
                    post.tags.some(tag =>
                        tag.toLowerCase() === word
                    )
                ) {
                    score += 5;
                }
            });

            // Text Match
            words.forEach(word => {

                if (
                    post.text.toLowerCase().includes(word)
                ) {
                    score += 2;
                }

            });

            return {
                score,
                post
            };

        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.post);

    return rankedPosts;
}

/**
 * Build AI Context
 */
function buildContext(posts) {
  if (!posts.length) {
    return "No relevant campus posts found.";
  }

  let context = "";

  posts.forEach((post, index) => {
    context += `
Post ${index + 1}

Author:
${post.author?.name || "Unknown"}

Category:
${post.category}

Content:
${post.text}

Tags:
${post.tags?.join(", ") || "None"}

Created:
${new Date(post.createdAt).toLocaleString()}

----------------------------------------
`;
  });

  return context;
}

/**
 * Main Function
 */
async function getCampusContext(userMessage) {
  const categories = detectCategories(userMessage);

  const posts = await searchPosts(userMessage, categories);

  const context = buildContext(posts);

  return {
    categories,
    posts,
    context
};
}

module.exports = {
  detectCategories,
  searchPosts,
  buildContext,
  getCampusContext
};