import { useNavigate } from "react-router-dom";
import { Card, Typography, Box, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Planets from "./Planets";

const SignupOrLogin = () => {
  //Router init
  const navigate = useNavigate();

  //Send  user to sign up or log in
  const handleLoginClick = () => {
    console.log("Login button clicked");
    navigate("/loginpage");
  };
  const handleSignUpClick = () => {
    navigate("/signuppage");
  };

  return (
    <div className="SignupPage">
      <Planets />
      <nav>
        <Box
          component="img"
          sx={{
            maxHeight: "7rem",
            maxWidth: "7rem",
          }}
          alt="NCT 127"
          src="./src/assets/nctlogo.png"
          style={{
            zIndex: "2",
          }}
        ></Box>
      </nav>
      <CssBaseline />
      <Card
        style={{
          zIndex: "3",
          position: "relative",
          padding: "2rem",
          maxWidth: "30rem",
          width: "100%",
          margin: "0 auto",
          boxShadow:
            "0rem .5rem 1rem rgba(245, 245, 245, 0.05), 0rem 1rem 2rem .5rem rgba(235, 235, 235, 0.05)",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "rgb(8, 8, 8)",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSignUpClick}
          style={{
            boxShadow:
              "0rem .5rem 1rem rgba(245, 245, 245, 0.05), 0rem 1rem 2rem .5rem rgba(235, 235, 235, 0.05)",
            fontFamily: '"Space Grotesk", sans-serif',
          }}
          sx={{
            mt: 2,
            backgroundColor: "rgb(8, 8, 8)",
            color: "rgb(245, 245, 245)",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            border: ".1rem solid rgb(245, 245, 245)",
          }}
        >
          Sign Up
        </Button>
        <Typography
          style={{
            color: "rgb(245, 245, 245)",
            fontSize: "1rem",
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          Or
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleLoginClick}
          style={{
            boxShadow:
              "0rem .5rem 1rem rgba(245, 245, 245, 0.05), 0rem 1rem 2rem .5rem rgba(235, 235, 235, 0.05)",
            fontFamily: '"Space Grotesk", sans-serif',
          }}
          sx={{
            mb: 2,
            backgroundColor: "rgb(235, 235, 235)",
            color: "rgb(8, 8, 8)",
            textTransform: "none",
            fontWeight: "bold",
            border: "0rem solid rgb(245, 245, 245)",
            fontSize: "1rem",
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default SignupOrLogin;
