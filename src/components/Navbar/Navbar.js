import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Auth } from "../Auth/Auth";

export const Navbar = () => {
  const classes = useStyles();

  //const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("profile user is below :: ");
  console.log(user);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    console.log("in useEffect");
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="memories"
            height="40px"
          />
        </Link>
        <Typography className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Typography>
      </AppBar>
    </>
  );
};
