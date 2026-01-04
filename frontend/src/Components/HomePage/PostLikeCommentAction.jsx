
import { useState } from "react";
import axios from "axios";

const PostLikesComments = ({ post, currentUser, onPostUpdate, setFlash }) => {
console.log(currentUser)
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
  
  const isLiked = post.likes?.some(
    (id) => id.toString() === userId
  );

  //like
    const handleLike = async () => {
    if (!currentUser) {
      setFlash?.({
        type: "danger",
        message: "Please login to like posts",
      });
      return;
    }

    try {
      const res = await axios.post(
        `/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onPostUpdate({ ...post,likes:
          res.data.action === "liked"
            ? [...post.likes, userId]
            : post.likes.filter((id) => id !== userId),
      });
    } catch (err) {
      console.error("Like failed", err);
       setFlash({
      type: "danger",
      message: err.response?.data?.error || "please login to like"
    });
    }
  };

  //comment
  const toggleComments = () => {
    setShowCommentBox((prev) => !prev);
  };

  const handleCommentSubmit = async (e) => {
    if (e.key !== "Enter") return;

    const token = localStorage.getItem("token");

    if (!currentUser || !token) {
      setFlash?.({
        type: "danger",
        message: "Please login to comment",
      });
      return;
    }

    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `/posts/${post._id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdate({
        ...post,
        comments: [...post.comments, res.data.comment],
      });

      setCommentText("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  const handleShare = async () => {
  const token = localStorage.getItem("token");

  if (!currentUser || !token) {
    setFlash?.({
      type: "danger",
      message: "Please login to share posts",
    });
    return;
  }

  const postUrl = `${window.location.origin}/posts/${post._id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "BMSIT Campus",
        text: "Check out this post 👇",
        url: postUrl,
      });
    } else {
      await navigator.clipboard.writeText(postUrl);
      setFlash?.({
        type: "success",
        message: "Post link copied",
      });
    }

    await axios.post(
      `/posts/${post._id}/share`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    setFlash?.({
      type: "danger",
      message: "Failed to share post",
    });
  }
};

//save handler
const handleSave = async () => {
  if (!currentUser) {
    setFlash?.({
      type: "danger",
      message: "Please login to save posts",
    });
    return;
  }

  try {
    const res = await axios.post(
      `/posts/${post._id}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    onPostUpdate({
      ...post,
      saves: res.data.saves,
    });

  } catch (err) {
    setFlash?.({
      type: "danger",
      message: "Failed to save post",
    });
  }
};

return (
    <>
 <div className="d-flex justify-content-between text-light opacity-75 small mb-2 px-1">
   
    <span role="button" onClick={handleLike} style={{ cursor: "pointer" }}>
        <i  className={`fa-${isLiked ? "solid" : "regular"} fa-heart pe-2`}  style={{ color: isLiked ? "#f91880" : "" }}></i>
        {post.likes?.length || 0}
    </span>

    <span 
        role="button"
        onClick={toggleComments}
        style={{ cursor: "pointer" }}
        >
        <i className="fa-regular fa-comment pe-2"></i> {post.comments?.length || 0}
    </span>
    {/* <span><i className="fa-regular fa-folder pe-2"></i>{post.save?.length || 0}</span> */}
    <span
  role="button"
  onClick={handleSave}
  style={{ cursor: "pointer" }}
>
  <i
    className={`fa-${isSaved ? "solid" : "regular"} fa-folder pe-2`}
    style={{ color: isSaved ? "#facc15" : "" }}
  ></i>
  {post.saves?.length || 0}
</span>

    <span
      role="button"
      onClick={handleShare}
      style={{ cursor: "pointer" }}
    >
      <i className="fa-solid fa-share pe-2"></i>
      {post.shares?.length || 0}
    </span>

</div>
<div>
   {showCommentBox && (
  <>
    <div className="d-flex align-items-center gap-2 mt-2">
      
      <img
        src={currentUser?.profile_image?.url ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
        alt="profile"
        className="rounded-circle"
        width="30"
        height="30"
      />

      <input
        type="text"
        className="form-control form-control-sm bg-dark text-white border-secondary comment-input rounded-pill"
        placeholder="Add a reply… (Press Enter)"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleCommentSubmit}
      />
    </div>
    <div className="mt-3 container  overflow-auto" style={{ maxHeight: "150px" }}>
      {post.comments?.length === 0 && (
        <p className="text-muted small">No comments yet</p>
      )}

      {post.comments?.map((comment) => (
        <div key={comment._id} className="d-flex gap-2 mb-3">
          <img
            src={
              comment.author?.profile_image?.url ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="profile"
            className="rounded-circle"
            width="30"
            height="30"
          />

          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold text-white small">
                @{comment.author?.username}
              </span>
              <span className="text-white small">
                · {formatTimeAgo(comment.createdAt)}
              </span>
            </div>

            <p className="mb-0 text-light small">
              {comment.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  </>
)}


</div>
</>
  
 );
}

export default PostLikesComments;
