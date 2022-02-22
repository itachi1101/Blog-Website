import { useContext, useEffect, useState } from "react";
import "../Pages/HomePage/homePage.css";
import AllPosts from "./AllPosts";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
export default function MyPosts() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/post?user=${user.user.username}`
      );
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">Personal</span>
          <span className="headerTitleLg">Blogs</span>
        </div>
        <img
          className="headerImg"
          src="https://images.unsplash.com/photo-1530910417612-701222d79f2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
        />
      </div>
      <div className="home">
        <AllPosts posts={posts} />
      </div>
    </>
  );
}
