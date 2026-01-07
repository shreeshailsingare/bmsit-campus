import PostEditAction from "./PostEditAction";
import PostLikesComments from "./PostLikeCommentAction";
import TruncatedText from "./TruncatedText";


function PostItem({ post, onPostUpdate, currentUser, setFlash }) {

  const formatTimeAgo = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
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
             {currentUser && currentUser.username == post.author.username &&  <PostEditAction postId={post._id} onPostUpdate={onPostUpdate} />}
              
            </div>
          </div>
            
          <TruncatedText text={post.text} limit={150} />


          {post.image?.url && (
            <div className="post-media-wrapper mb-3">

              {post.image.contentType?.startsWith("image/") && (
                <img src={post.image.url} className="post-media" />
              )}

              {post.image.contentType?.startsWith("video/") && (
                <video src={post.image.url} className="post-media" controls />
              )}


              {post.image.contentType === "application/pdf" && (
              <a
                href={post.image.url}
                target="_blank"
                rel="noreferrer"
                className="gmail-pdf"
              >
                <div className="pdf-icon">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>

                <div className="pdf-info">
                  <span className="pdf-name">
                    {post.image.originalname || "Document.pdf"}
                  </span>
                  <span className="pdf-sub">PDF • Click to view</span>
                </div>

                <div className="pdf-action">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a>
            )}

            </div>
          )}

        <PostLikesComments
            post={post}
            currentUser={currentUser}
            onPostUpdate={onPostUpdate}
            setFlash={setFlash}
        />

        </div>
      </div>

      <hr className="mt-2 mb-0" />
    </div>
  );
}

export default PostItem;
