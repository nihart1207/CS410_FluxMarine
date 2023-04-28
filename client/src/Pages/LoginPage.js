import { useState } from "react";
import Alert from '@mui/material/Alert';
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
import { useNavigate } from "react-router-dom";
import "../assets/style.css"

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
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
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
        if (response.status === 401) {
          setError("Wrong username/password. Try Again");
        } else if (response.status === 400 ) {
          setError("Missing username/password");
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


  return (
    <div >
    <Box
      sx={{
        
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="background-image"></div>
      
      <Box
        sx={{
          width: "50%",
          height: "65%" ,
          display: "flex",
          opacity:"100%",
          borderRadius: "30px",
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
          <Typography variant="h4" sx={{ mb: 3, color: "#009688" }}>
            Welcome back,
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

            {error && <Alert severity="error">{error}</Alert>}

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


    </Box>
    </div>
  );
}

export default LoginPage;
