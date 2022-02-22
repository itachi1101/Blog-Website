import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
export default function Post({ post }) {
  const { title, description, updatedAt, _id } = post;
  const timestamp = new Date(updatedAt).toDateString();
  return (
    <Card
      sx={{ minWidth: 345 }}
      style={{ marginTop: "20px", marginLeft: "20px" }}
    >
      <CardHeader title={title} subheader={`Updated at: ${timestamp}`} />
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1644691075420-10e570de79a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Link to={`post/${_id}`}>
          <Badge style={{ cursor: "pointer" }}>Read More</Badge>
        </Link>
      </CardActions>
    </Card>
  );
}
