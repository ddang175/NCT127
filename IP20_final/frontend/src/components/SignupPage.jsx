import "./SignupPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Planets from "./Planets";
import { form } from "framer-motion/client";

const SignupPage = () => {
  //Routing init
  const navigate = useNavigate();

  //Data from inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    patents: [],
  });

  //Update data when each input

  //Check if credentials are valid
  const [hasValidEmial, setHasValidEmail] = useState(false);
  const [hasValidUsername, setHasValidUsername] = useState(false);
  const [hasMatchingPasswords, setHasMatchingPasswords] = useState(false);
  const [hasValidPassword, setHasValidPassword] = useState(false);

  //password parameters
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [has8Characters, setHas8Characters] = useState(false);
  const [hasSpecialCharater, setHasSpecialCharater] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const passwordParams = [false, false, false, false];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
    //Check what type of input was changed and check was is needed there
    switch (name) {
      case "email":
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setHasValidEmail(true);
          setEmailError(false);
        } else setHasValidEmail(false);
        break;
      case "password":
        if (/[A-Z]/.test(value)) {
          setHasUpperCase(true);
          passwordParams[0] = true;
        } else {
          setHasUpperCase(false);
          passwordParams[0] = false;
        }

        if (/\d/.test(value)) {
          setHasNumber(true);
          passwordParams[1] = true;
        } else {
          setHasNumber(false);
          passwordParams[1] = false;
        }

        if (/[@!#$%]/.test(value)) {
          setHasSpecialCharater(true);
          passwordParams[2] = true;
        } else {
          setHasSpecialCharater(false);
          passwordParams[2] = false;
        }

        if (value.length >= 8) {
          setHas8Characters(true);
          passwordParams[3] = true;
        } else {
          setHas8Characters(false);
          passwordParams[3] = false;
        }
        if (
          passwordParams[0] &&
          passwordParams[1] &&
          passwordParams[2] &&
          passwordParams[3]
        ) {
          console.log("WTF");
          setHasValidPassword(true);
          setPasswordError(false);
        } else setHasValidPassword(false);
        break;
      case "confirmPassword":
        if (formData.password == value) {
          setHasMatchingPasswords(true);
          setMatchPasswordError(false);
        } else setHasMatchingPasswords(false);
        break;
      case "username":
        if (value.length != 0) {
          setHasValidUsername(true);
          setUsernameError(false);
        } else setHasValidUsername(false);
    }
  };

  //Erorrs change how textboxes look
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [matchPasswordError, setMatchPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  //When submitting, send a post request to make a new acconut
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hasValidPassword);

    if (hasValidEmial && hasValidPassword && hasMatchingPasswords) {
      try {
        const response = await fetch("http://localhost:8080/api/nctaccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();

          const accountId = data.id;

          console.log("Account created successfully:", accountId);
          navigate("/?accountId=" + accountId);
        } else {
          console.error("Error creating account:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("Form submitted with data:", formData);
      //Send out errors
    } else {
      if (!hasValidEmial) setEmailError(true);
      if (!hasValidPassword) setPasswordError(true);
      if (!hasMatchingPasswords) setMatchPasswordError(true);
      if (!hasValidUsername) setUsernameError(true);
    }
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
        <Typography
          className="text"
          style={{ fontFamily: "Space Grotesk", pointerEvents: "auto" }}
          variant="h4"
        >
          Sign Up
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={emailError}
          helperText={emailError ? "Email address is invalid" : ""}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputLabel-root": { color: "whitesmoke" },
            "& .MuiOutlinedInput-root": {
              "& .MuiInputBase-input": {
                color: "whitesmoke",
                fontSize: "1rem",
              },
              "& fieldset": { borderColor: "whitesmoke" },
              "&:hover fieldset": { borderColor: "whitesmoke" },
              "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
          }}
          variant="outlined"
          fullWidth
          required
          error={passwordError}
          helperText={passwordError ? "Password is invalid" : ""}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputLabel-root": { color: "whitesmoke" },
            "& .MuiOutlinedInput-root": {
              "& .MuiInputBase-input": {
                color: "whitesmoke",
                fontSize: "1rem",
              },
              "& fieldset": { borderColor: "whitesmoke" },
              "&:hover fieldset": { borderColor: "whitesmoke" },
              "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={matchPasswordError}
          helperText={matchPasswordError ? "Does not match Password" : ""}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputLabel-root": { color: "whitesmoke" },
            "& .MuiOutlinedInput-root": {
              "& .MuiInputBase-input": {
                color: "whitesmoke",
                fontSize: "1rem",
              },
              "& fieldset": { borderColor: "whitesmoke" },
              "&:hover fieldset": { borderColor: "whitesmoke" },
              "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
        <Typography
          style={{
            color: has8Characters
              ? "rgb(245, 245, 245)"
              : passwordError
              ? "rgb(213, 48, 47)"
              : "rgb(155, 155, 155)",
            fontSize: ".9rem",
            lineHeight: ".1rem",
          }}
          sx={{ mr: "auto" }}
        >
          &emsp; &bull; Contains more than 8 characters
        </Typography>
        <Typography
          style={{
            color: hasUpperCase
              ? "rgb(245, 245, 245)"
              : passwordError
              ? "rgb(213, 48, 47)"
              : "rgb(155, 155, 155)",
            fontSize: ".9rem",
            lineHeight: ".1rem",
          }}
          sx={{ mr: "auto" }}
        >
          &emsp; &bull; Contains Uppercase letter
        </Typography>
        <Typography
          style={{
            color: hasNumber
              ? "rgb(245, 245, 245)"
              : passwordError
              ? "rgb(213, 48, 47)"
              : "rgb(155, 155, 155)",
            fontSize: ".9rem",
            lineHeight: ".1rem",
          }}
          sx={{ mr: "auto" }}
        >
          &emsp; &bull; Contains a Number
        </Typography>
        <Typography
          style={{
            color: hasSpecialCharater
              ? "rgb(245, 245, 245)"
              : passwordError
              ? "rgb(213, 48, 47)"
              : "rgb(155, 155, 155)",
            fontSize: ".9rem",
            paddingBottom: "1.5rem",
            lineHeight: ".1rem",
          }}
          sx={{ mr: "auto" }}
        >
          &emsp; &bull; Contains @,!,#,$, or %
        </Typography>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={usernameError}
          helperText={usernameError ? "Username cannot be blank" : ""}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputLabel-root": { color: "whitesmoke" },
            "& .MuiOutlinedInput-root": {
              "& .MuiInputBase-input": {
                color: "whitesmoke",
                fontSize: "1rem",
              },
              "& fieldset": { borderColor: "whitesmoke" },
              "&:hover fieldset": { borderColor: "whitesmoke" },
              "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "transparent",
              },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            backgroundColor: "rgb(235, 235, 235)",
            color: "rgb(8, 8, 8)",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "rgb(200, 200, 200)",
            },
          }}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default SignupPage;
