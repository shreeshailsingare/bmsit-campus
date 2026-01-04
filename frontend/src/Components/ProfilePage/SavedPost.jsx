import { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../HomePage/PostItem";
import { useContext } from "react";
import { AuthContext } from "../SignUp/AuthContext";

function SavedPosts({ setFlash }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("/posts/saved/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPosts(res.data))
    .catch(() =>
      setFlash?.({
        type: "danger",
        message: "Failed to load saved posts",
      })
    )
    .finally(() => setLoading(false));
  }, []);

const updatePost = (updatedPost) => {
  const userId = user?._id;

  const isStillSaved = updatedPost.saves?.some(
    id => id.toString() === userId
  );

  if (!isStillSaved) {
    setPosts(prev =>
      prev.filter(p => p._id !== updatedPost._id)
    );
    return;
  }
  setPosts(prev =>
    prev.map(p =>
      p._id === updatedPost._id ? updatedPost : p
    )
  );
};




  if (loading)
    return <p className="text-white text-center mt-5 pt-5">Loading saved posts…</p>;

  if (posts.length === 0)
    return <p className="text-white text-center mt-5 pt-5">No saved posts</p>;

  return (
    <div className="mt-5">
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          onPostUpdate={updatePost}
          currentUser={user}
          setFlash={setFlash}
        />
      ))}
    </div>
  );
}

export default SavedPosts;
