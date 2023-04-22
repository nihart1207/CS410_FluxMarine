import { useState } from "react";
import axios from 'axios';
import {
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {"username": email, "password": password};

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        if (response.status == 401) {
          alert("Wrong username/password");
        } else if (response.status == 400 ) {
          alert("missing username/password");
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setLoggedIn(true);
    console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  };
  

  if (loggedIn) {
    // Render dashboard if the user is logged in
    navigate("/dashboard");
  }

  const handleSignUpClick = () => {
    navigate("/signup"); // redirect to sign up page
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, color: "#009688" }}>
            Login
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </SubmitButton>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Form>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "60%",
          height: "100%",
          backgroundImage: "url(assests/flux.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(36,198,220,0.5), rgba(81,74,157,0.5))",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
