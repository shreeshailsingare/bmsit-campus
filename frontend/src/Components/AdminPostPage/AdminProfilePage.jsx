import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../HomePage/PostItem";


function AdminProfilePage({ currentUser, setFlash }) {
  const { deptId } = useParams();
  const [admin, setAdmin] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`/admin/posts/${deptId}`);
        setAdmin(res.data.admin);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to load admin page", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [deptId]);

  if (loading) {
    return <p className="text-white text-center mt-5 pt-5">Loading...</p>;
  }

  if (!admin) {
    return <p className="text-danger text-center mt-5 pt-5">Admin not found</p>;
  }

  return (
    <div className=" min-vh-100 mt-5 pt-3">

      <div className="position-relative">
        <img
          src="/banner.png"
          className="w-100"
          style={{ height: "150px", objectFit: "cover" }}
        />

        <img
          src={admin.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          className="rounded-circle border border-3 border-dark position-absolute"
          style={{
            width: "110px",
            height: "110px",
            bottom: "-55px",
            left: "20px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="container px-0  pt-5 mt-4">
        <div className="ps-3"> 
        <h5 className="fw-bold text-white">{admin.name}</h5>
        <p className="text-light opacity-75">@{admin.username}</p>
      </div>
        <hr className="text-secondary" />
      </div>

      <div>
        {posts.length === 0 ? (
          <p className="text-light text-center">No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              currentUser={currentUser}
              setFlash={setFlash}
              onPostUpdate={(updatedPost) => {
                setPosts((prev) =>
                  prev.map((p) =>
                    p._id === updatedPost._id ? updatedPost : p
                  )
                );
              }}
            />
          ))
        )}

      </div>
    </div>
  );
}

export default AdminProfilePage;
