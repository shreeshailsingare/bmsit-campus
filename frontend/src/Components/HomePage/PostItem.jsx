import { useState } from "react";
import PostEditAction from "./PostEditAction";
import PostLikesComments from "./PostLikeCommentAction";
import TruncatedText from "./TruncatedText";

function PostItem({ post, onPostUpdate, onPostDelete, currentUser, setFlash }) {
  const [selectedImg, setSelectedImg] = useState(null); // State for the clickable image

  const formatTimeAgo = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const pdfs = post.media?.filter(item => item.contentType === "application/pdf").slice(0, 4) || [];
  const video = post.media?.find(item => item.contentType?.startsWith("video/"));
  const images = post.media?.filter(item => item.contentType?.startsWith("image/")).slice(0, 4) || [];

  return (
    <div className="container pt-0  pe-3 text-white">
      {/* Lightbox Overlay */}
      {selectedImg && (
        <div className="image-lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <button className="close-lightbox">&times;</button>
          <img src={selectedImg} alt="Full view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="container ps-2 row mt-2">
        <div className="col-1  pe-0 d-flex justify-content-center align-items-start">
          <img
            src={post.author?.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="rounded-3"
            width="42"
            height="42"
            alt="profile"
          />
        </div>

        <div className="col-11 ps-3 pt-0">
          <div className="d-flex align-items-start justify-content-center">
            <div className="d-flex align-items-start col-11">
              <h6 className="fw-bold mb-0">{post.author?.name}</h6>
              <span className="text-light opacity-75 px-2">@{post.author?.username}</span>
              <small className="text-light opacity-75">· {formatTimeAgo(post.createdAt)}</small>
            </div>
            <div className="col-1 d-flex justify-content-end">
              {currentUser && currentUser.username === post.author.username && (
                <PostEditAction postId={post._id} onPostDeleted={onPostDelete} />
              )}
            </div>
          </div>

          <TruncatedText text={post.text} limit={150} />

          <div className="post-attachments-wrapper mt-2 mb-3">
            {/* PDFs */}
            {pdfs.map((item, index) => (
              <a key={`pdf-${index}`} href={item.url} target="_blank" rel="noreferrer" className="pdf-attachment-card mb-2">
                <div className="pdf-icon-wrapper"><i className="fa-solid fa-file-pdf"></i></div>
                <div className="pdf-content">
                  <span className="pdf-title">{item.filename || "Document.pdf"}</span>
                  <span className="pdf-subtitle">PDF • Tap to view</span>
                </div>
              </a>
            ))}

            {/* Video */}
            {video && (
              <div className="post-video-container mb-2">
                <video src={video.url} controls className="post-video-player" />
              </div>
            )}

            {/* Clickable Image Grid */}
            {images.length > 0 && (
              <div className={`post-media-grid count-${images.length}`}>
                {images.map((item, index) => (
                  <div 
                    key={`img-${index}`} 
                    className="grid-item clickable" 
                    onClick={() => setSelectedImg(item.url)}
                  >
                    <img src={item.url} alt="post content" className="grid-media" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <PostLikesComments post={post} currentUser={currentUser} onPostUpdate={onPostUpdate} setFlash={setFlash} />
        </div>
      </div>
      <hr className="mt-2 mb-0 opacity-25" />
    </div>
  );
}

export default PostItem;