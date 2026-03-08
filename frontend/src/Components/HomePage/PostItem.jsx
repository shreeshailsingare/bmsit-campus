import { useState } from "react";
import PostEditAction from "./PostEditAction";
import PostLikesComments from "./PostLikeCommentAction";
import TruncatedText from "./TruncatedText";

function PostItem({ post, onPostUpdate, onPostDelete, currentUser, setFlash }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const formatTimeAgo = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    if (seconds < 60) return "just now";
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
    <div className="x-post-container">
      {/* Lightbox Overlay */}
      {selectedImg && (
        <div className="image-lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <button className="close-lightbox">&times;</button>
          <img src={selectedImg} alt="Full view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="x-post-content">
        {/* Left Side: Profile Image */}
        <div className="x-post-left">
          <img
            src={post.author?.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="x-profile-img"
            
            alt="profile"
          />
        </div>

        {/* Right Side: Header, Text, Media, Actions */}
        <div className="x-post-right">
          <div className="x-post-header">
            <div className="x-user-info">
              <span className="x-display-name">{post.author?.name}</span>
              <span className="x-username">@{post.author?.username}</span>
              <span className="x-dot">·</span>
              <span className="x-time">{formatTimeAgo(post.createdAt)}</span>
            </div>
            <div className="x-post-options">
              {currentUser && currentUser.username === post.author.username && (
                <PostEditAction postId={post._id} onPostDeleted={onPostDelete} />
              )}
            </div>
          </div>

          <div className="x-post-body">
            <TruncatedText text={post.text} limit={280} /> {/* X limit is higher */}
          </div>

          {/* Media Section */}
          {(images.length > 0 || video || pdfs.length > 0) && (
            <div className="x-media-container">
              {/* Video */}
              {video && (
                <div className="post-video-container mb-2">
                  <video src={video.url} controls className="post-video-player" />
                </div>
              )}

              {/* Images Grid */}
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

              {/* PDFs */}
              {pdfs.map((item, index) => (
                <a key={`pdf-${index}`} href={item.url} target="_blank" rel="noreferrer" className="pdf-attachment-card mt-2">
                  <div className="pdf-icon-wrapper"><i className="fa-solid fa-file-pdf"></i></div>
                  <div className="pdf-content">
                    <span className="pdf-title">{item.filename || "Document.pdf"}</span>
                    <span className="pdf-subtitle">PDF • View document</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Action Bar (Like/Comment) */}
          <div className="x-post-actions">
            <PostLikesComments post={post} currentUser={currentUser} onPostUpdate={onPostUpdate} setFlash={setFlash} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;