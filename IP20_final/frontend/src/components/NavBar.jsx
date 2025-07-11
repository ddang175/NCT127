import React, { useState, useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropDown from "./DropDown";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Navbar = () => {
  //For when dropdown menu functionality
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContentKey, setDrawerContentKey] = useState(null);
  const hoverTimeout = useRef(null);

  //routing
  const navigate = useNavigate();
  const location = useLocation();

  //Navbar is where the user can search up or use a preset search to find the patents
  const params = new URLSearchParams(location.search);

  //Nvabar changes if the person is logged in or not
  const isLoggedIn = params.has("accountId");

  //Add account to the url when signed in
  const buildLink = (path) => {
    return accountId ? `${path}?accountId=${accountId}` : path;
  };

  //Get account ID
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");

  //When the mouse hovers over a button in the navbar, dropdown menu will drop
  const handleMouseEnter = (key) => {
    clearTimeout(hoverTimeout.current);
    setDrawerContentKey(key);
    setDrawerOpen(true);
  };

  //When the mouse leaves, the dropdown menu will raise
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setDrawerOpen(false);
      setDrawerContentKey(null);
    }, 225);
  };

  //Homebutton functinality
  const handleClick = () => {
    console.log("HI CHAT");
    navigate(buildLink("/"));
  };

  return (
    <AppBar
      onMouseLeave={handleMouseLeave}
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: "3.2rem",
        overflow: "hidden",
      }}
    >
      <DropDown
        anchor="top"
        open={drawerOpen}
        contentKey={drawerContentKey}
        handleMouseEnter={() => handleMouseEnter(drawerContentKey)}
        handleMouseLeave={handleMouseLeave}
      />
      <Toolbar
        variant="dense"
        sx={{
          overflow: "hidden",
          backgroundColor: "rgb(8, 8, 8)",
          maxHeight: "3.2rem",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
        }}
      >
        <Button
          onMouseEnter={handleMouseLeave}
          onClick={handleClick}
          sx={{
            ml: "auto",
            border: "none",
            borderRadius: "10rem",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <Box
            component="img"
            sx={{
              maxHeight: "2.2rem",
              maxWidth: "2.2rem",
            }}
            alt="NCT 127"
            src="./src/assets/nctlogo.png"
          />
        </Button>
        <Button
          variant="text"
          size="small"
          onMouseEnter={() => handleMouseEnter("technology")}
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Techonology
        </Button>
        <Button
          onMouseEnter={() => handleMouseEnter("electronics")}
          variant="text"
          size="small"
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Electrical
        </Button>
        <Button
          onMouseEnter={() => handleMouseEnter("health")}
          variant="text"
          size="small"
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Health
        </Button>
        <Button
          onMouseEnter={() => handleMouseEnter("environment")}
          variant="text"
          size="small"
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Environment
        </Button>
        <Button
          onMouseEnter={() => handleMouseEnter("manufacturing")}
          variant="text"
          size="small"
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Manufacturing
        </Button>
        <Button
          onMouseEnter={() => handleMouseEnter("energy")}
          variant="text"
          size="small"
          sx={{
            ml: 2,
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: ".8rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Energy
        </Button>
        <Typography
          sx={{
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "1.2rem",
            color: "whitesmoke",
          }}
        >
          |
        </Typography>
        <IconButton
          onMouseEnter={() => handleMouseEnter("search")}
          aria-label="account"
          size="medium"
          color="inherit"
          sx={{
            border: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
        {/* Changes if the button is showing based on signin */}
        {isLoggedIn ? (
          <IconButton
            aria-label="stash"
            size="medium"
            color="inherit"
            sx={{
              border: "none",
              ml: "auto",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            onClick={() => {
              navigate(buildLink("/stash"));
            }}
          >
            <ShoppingBagIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <div style={{ marginLeft: "auto" }}></div>
        )}
        {/* Changes where the user goes based on if they signed in */}
        <IconButton
          aria-label="account"
          size="medium"
          color="inherit"
          sx={{
            border: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          onClick={() => {
            isLoggedIn
              ? navigate(buildLink("/profile"))
              : navigate(buildLink("/signinorlogin"));
          }}
        >
          <AccountCircleIcon fontSize="inherit" />
        </IconButton>
        <Button
          onClick={() => {
            isLoggedIn
              ? navigate(buildLink("/authors"))
              : navigate(buildLink("/signinorlogin"));
          }}
          variant="text"
          size="small"
          sx={{
            paddingLeft: ".8rem",
            paddingRight: ".8rem",
            textTransform: "none",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "rem",
            color: "whitesmoke",
            "&:hover": {
              backgroundColor: "rgb(14, 14, 14)",
            },
          }}
        >
          Authors
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
