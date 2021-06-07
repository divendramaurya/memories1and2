import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost, dislikePost } from "../../../actions/posts";

export const Post = ({ post, setcurrentID }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" style={{ color: "blue" }} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" style={{ color: "blue" }} />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" style={{ color: "blue" }} />
        &nbsp;Like
      </>
    );
  };

  const DisLikes = () => {
    if (post.dislikes.length > 0) {
      return post.dislikes.find(
        (dislike) => dislike === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbDownAltIcon fontSize="small" style={{ color: "red" }} />
          &nbsp;
          {post.dislikes.length > 2
            ? `You and ${post.dislikes.length - 1} others`
            : `${post.dislikes.length} dislike${
                post.dislikes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbDownAltOutlined fontSize="small" style={{ color: "red" }} />
          &nbsp;{post.dislikes.length}{" "}
          {post.dislikes.length === 1 ? "Dislike" : "Dislikes"}
        </>
      );
    }

    return (
      <>
        <ThumbDownAltOutlined fontSize="small" style={{ color: "red" }} />
        &nbsp; <span> dislike</span>
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
          {/* {post.createdAt} */}
        </Typography>
      </div>

      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setcurrentID(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {/*  {!post.tags === undefined && post.tags.map((tag) => `#${tag} `)} */}
          {post.tags.map((tag) => `#${tag}  `)}
          {/* {post.tags} */}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          disabled={!user?.result}
          size="small"
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
          {/*  <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like
          {post.likes.length} */}
        </Button>
        <Button
          disabled={!user?.result}
          size="small"
          onClick={() => dispatch(dislikePost(post._id))}
        >
          <DisLikes color="primary" />
          {/* <ThumbDownAltIcon style={{ color: "red" }} fontSize="small" />
          &nbsp;  Disike &nbsp; 
          {Math.abs(post.dislikeCount)} */}
        </Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon color="action" fontSize="small" /> {/* Delete */}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
