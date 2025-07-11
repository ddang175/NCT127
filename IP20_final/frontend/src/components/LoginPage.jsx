import "./SignupPage.css";
import { Card, Typography, Box, TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Planets from "./Planets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  //Helps for auth
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  //adds account id when auth
  const navigate = useNavigate();

  //data from buttons
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Updates data when typed in
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  //When pessing submit, send a post  request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.email);
      const response = await fetch(
        "http://localhost:8080/api/nctaccount/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();

        //Updates users on what is wrong and what is right
        console.log(data);
        if (data.message == "Invalid Email") {
          setValidEmail(false);
          setValidPassword(true);
        } else if (data.message == "Wrong Password") {
          setValidEmail(true);
          setValidPassword(false);
        } else if (data.id) {
          var accountId = data.id;
          console.log("Signed in:", accountId);
          navigate("/?accountId=" + accountId);
        }
      } else {
        console.error("Error signing in:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
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
          style={{
            fontFamily: "Space Grotesk",
            pointerEvents: "auto",
            paddingBottom: "1.7rem",
          }}
          variant="h4"
        >
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
          error={!validEmail}
          helperText={validEmail ? "" : "Email not found"}
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
          type="Password"
          name="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
          error={!validPassword}
          helperText={validPassword ? "" : "Wrong password"}
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
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
