import { useState, useRef } from "react";
import PostEditAction from "./PostEditAction";
import PostLikesComments from "./PostLikeCommentAction";
import TruncatedText from "./TruncatedText";


function PostItem({ post, onPostUpdate, onPostDelete, currentUser, setFlash }) {

  const formatTimeAgo = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const [activeIndex, setActiveIndex] = useState(0);
const scrollRef = useRef(null);

const handleScroll = () => {
  const el = scrollRef.current;
  const index = Math.round(el.scrollLeft / el.offsetWidth);
  setActiveIndex(index);
};


  return (
    <div className="container pt-2 ps-2 pe-3 text-white">
      <div className="row mt-2">
        <div className="col-2 pe-0">
          <img
            src={post.author?.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="rounded-circle"
            width="42"
            height="42"
            alt="profile"
          />
        </div>

        <div className="col-10 ps-0">
          <div className=" d-flex align-items-center justify-content-center">
            <div className="d-flex  align-items-center  col-11">
            <h6 className="fw-bold mb-0">{post.author?.name}</h6>
            <span className="text-light opacity-75 px-2">
              @{post.author?.username}
            </span>
            <small className="text-light opacity-75">
              · {formatTimeAgo(post.createdAt)}
            </small>
          </div>
           <div className="col-1 d-flex justify-content-end">
             {currentUser && currentUser.username == post.author.username &&  <PostEditAction postId={post._id}  onPostDeleted={onPostDelete}/>}              
            </div>
          </div>
            
          <TruncatedText text={post.text} limit={150} />



         {post.media?.length > 0 && (
  <div className="carousel-wrapper mb-3">

    <div
      className="media-scroll"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {post.media.map((item, index) => (
        <div key={index} className="media-item">

          {item.contentType?.startsWith("image/") && (
            <img src={item.url} alt={`media-${index}`} />
          )}

          {item.contentType?.startsWith("video/") && (
            <video src={item.url} controls />
          )}

          {item.contentType === "application/pdf" && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="pdf-card p-2"
            >
              <div className="pdf-icon p-4 me-1"> <i className="fa-solid fa-file-pdf "></i></div>
              <div className="pdf-text text-break">
                 <span className="pdf-name text-wrap">
                    {item.filename || "Document.pdf"}
                  </span>
                <span>Tap to open</span>
                
              </div>
                <div className="pdf-action">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
            </a>
          )}

        </div>
      ))}
    </div>

    {post.media.length > 1 && (
      <>
        <div className="carousel-dots">
          {post.media.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="carousel-counter">
          {activeIndex + 1}/{post.media.length}
        </div>
      </>
    )}

  </div>
)}


        <PostLikesComments  post={post}  currentUser={currentUser}  onPostUpdate={onPostUpdate}  setFlash={setFlash}  />
        </div>
      </div>

      <hr className="mt-2 mb-0" />
    </div>
  );
}

export default PostItem;
