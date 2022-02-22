import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Badge } from "react-bootstrap";
import { Context } from "../context/Context";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/post/" + path);
      setPost(res.data.data);
      setTitle(res.data.data.title);
      setDesc(res.data.data.description);
    };
    getPost();
  }, [path]);
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/post/" + path);
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/post/${path}`, {
        username: user.user.username,
        title,
        description: desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <Card
      sx={{ minWidth: 345 }}
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "100px",
        width: "90%",
        marginLeft: "3.8rem",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      />
      <CardContent
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          marginBottom: "50px",
        }}
      >
        <Typography gutterBottom variant="h1" component="div">
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ width: "100%", textAlign: "right", color: "blue" }}
        >
          Author: {post.username}
        </Typography>
        {updateMode ? (
          <>
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{
                border: "none",
                color: "#666",
                fontSize: "18px",
                lineHeight: "25px",
                marginBottom: "30px",
                width: "100%",
                minHeight: "350px",
              }}
            />
            <Badge
              bg="success"
              style={{ cursor: "pointer", fontSize: "1.3rem" }}
              onClick={handleUpdate}
            >
              Update
            </Badge>
          </>
        ) : (
          <Typography
            variant="span"
            color="text.secondary"
            style={{ width: "100%", fontSize: "1.55rem", marginTop: "40px" }}
          >
            {desc}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {user != null && updateMode === false ? (
          <Badge
            bg="success"
            style={{ cursor: "pointer", fontSize: "1.3rem" }}
            onClick={() => setUpdateMode(true)}
          >
            Edit
          </Badge>
        ) : (
          ""
        )}
        {user != null && updateMode === false ? (
          <Badge
            bg="danger"
            style={{ cursor: "pointer", fontSize: "1.3rem" }}
            onClick={handleDelete}
          >
            Delete
          </Badge>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}
