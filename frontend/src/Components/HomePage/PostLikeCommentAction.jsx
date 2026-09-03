import { useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Bookmark, Share2, Send } from "lucide-react";

const PostLikesComments = ({ post, currentUser, onPostUpdate, setFlash }) => {
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return "now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const userId = currentUser?._id;
  const isSaved = post.saves?.some(id => id.toString() === userId);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const isLiked = post.likes?.some(id => id.toString() === userId);

  const handleLike = async () => {
    if (!currentUser) {
      setFlash?.({ type: "danger", message: "Please login to like posts" });
      return;
    }
    try {
      const res = await axios.post(`/posts/${post._id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const likes = post.likes || [];
      onPostUpdate({
        ...post,
        likes: res.data.action === "liked"
          ? [...likes, userId]
          : likes.filter((id) => id.toString() !== userId),
      });
    } catch (err) {
      setFlash?.({ type: "danger", message: err.response?.data?.error || "Please login to like" });
    }
  };

  const toggleComments = () => setShowCommentBox(prev => !prev);

  const handleCommentSubmit = async (e) => {
    if (e?.key && e.key !== "Enter") return;
    const token = localStorage.getItem("token");
    if (!currentUser || !token) {
      setFlash?.({ type: "danger", message: "Please login to comment" });
      return;
    }
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`/posts/${post._id}/comment`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onPostUpdate({ ...post, comments: [...(post.comments || []), res.data.comment] });
      setCommentText("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  const handleShare = async () => {
    const token = localStorage.getItem("token");
    if (!currentUser || !token) {
      setFlash?.({ type: "danger", message: "Please login to share posts" });
      return;
    }
    const postUrl = `${window.location.origin}/posts/${post._id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "BMSIT Campus", text: "Check out this post 👇", url: postUrl });
      } else {
        await navigator.clipboard.writeText(postUrl);
        setFlash?.({ type: "success", message: "Post link copied" });
      }
      await axios.post(`/posts/${post._id}/share`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onPostUpdate({ ...post, shares: [...(post.shares || []), userId] });
    } catch (err) {
      setFlash?.({ type: "danger", message: "Failed to share post" });
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      setFlash?.({ type: "danger", message: "Please login to save posts" });
      return;
    }
    try {
      const res = await axios.post(`/posts/${post._id}/save`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onPostUpdate({ ...post, saves: res.data.saves });
    } catch (err) {
      setFlash?.({ type: "danger", message: "Failed to save post" });
    }
  };

  return (
    <div className="feed-actions">
      <div className="feed-actions-bar">
        <button
          className={`feed-action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          title="Like"
        >
          <Heart size={16} fill={isLiked ? "#f91880" : "none"} stroke={isLiked ? "#f91880" : "currentColor"} />
          <span>{post.likes?.length || 0}</span>
        </button>

        <button
          className={`feed-action-btn ${showCommentBox ? "active" : ""}`}
          onClick={toggleComments}
          title="Comment"
        >
          <MessageCircle size={16} />
          <span>{post.comments?.length || 0}</span>
        </button>

        <button
          className={`feed-action-btn ${isSaved ? "saved" : ""}`}
          onClick={handleSave}
          title="Save"
        >
          <Bookmark size={16} fill={isSaved ? "#facc15" : "none"} stroke={isSaved ? "#facc15" : "currentColor"} />
          <span>{post.saves?.length || 0}</span>
        </button>

        <button
          className="feed-action-btn"
          onClick={handleShare}
          title="Share"
        >
          <Share2 size={16} />
          <span>{post.shares?.length || 0}</span>
        </button>
      </div>

      {/* Comment Section */}
      {showCommentBox && (
        <div className="feed-comments">
          <div className="feed-comment-input-row">
            <img
              src={currentUser?.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="profile"
              className="feed-comment-avatar"
            />
            <div className="feed-comment-input-wrap">
              <input
                type="text"
                className="feed-comment-input"
                placeholder="Add a reply... (Press Enter)"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleCommentSubmit}
              />
              <button
                className="feed-comment-send"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
                title="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          <div className="feed-comment-list">
            {post.comments?.length === 0 && (
              <p className="feed-comment-empty">No comments yet</p>
            )}
            {post.comments?.map((comment) => (
              <div key={comment._id} className="feed-comment-item">
                <img
                  src={comment.author?.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="profile"
                  className="feed-comment-avatar-sm"
                />
                <div className="feed-comment-body">
                  <div className="feed-comment-meta">
                    <span className="feed-comment-author">@{comment.author?.username}</span>
                    <span className="feed-comment-time">· {formatTimeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="feed-comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostLikesComments;
