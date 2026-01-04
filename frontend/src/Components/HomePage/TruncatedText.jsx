import { useState } from "react";

function TruncatedText({ text, limit = 120 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const displayText = expanded || !isLong
    ? text
    : text.slice(0, limit) + "...";

  return (
    <p className="mt-1 mb-2 text-white">
      {displayText}

      {isLong && (
        <span
          role="button"
          className="ms-2 text-info fw-semibold"
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        >
          {expanded ? "Less" : "More"}
        </span>
      )}
    </p>
  );
}

export default TruncatedText;
