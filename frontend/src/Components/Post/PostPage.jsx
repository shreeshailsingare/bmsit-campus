import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../HomePage/PostItem";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!post) return <p className="text-center mt-5">Post not found</p>;

  return (
    <div className="container mt-5">
      <PostItem post={post} />
    </div>
  );
}

export default PostPage;
