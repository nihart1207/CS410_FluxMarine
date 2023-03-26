import { useState } from 'react';
import { TextField, Button, Link, Box, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Dashboard from '../components/Dashboard';
import { useNavigate } from "react-router-dom";




const Form = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    // Here you can perform authentication logic to check if the username and password are correct
    if (email === 'test' && password === '1234') {
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    // Render dashboard if the user is logged in
    return <Dashboard />;
  }

  const handleSignUpClick = () => {
    
    navigate('/signup'); // redirect to sign up page
  };


  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      width: '100%',
    }}>


      <Box sx={{
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          border: '1px solid grey',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
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
                sx={{ borderRadius: '8px' }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                sx={{ borderRadius: '8px' }}
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
                  )
                }}
              />
            </Box>
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </SubmitButton>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Form>
        </Box>
      </Box>
      <Box sx={{
  position: 'relative',
  width: '60%',
  height: '100%',
  backgroundImage: "url(assests/flux.png)",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(36,198,220,0.5), rgba(81,74,157,0.5))',
  },
}}>
  <Box sx={{
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  }}>
    <Button variant="contained" color="primary" onClick={handleSignUpClick}>
      Sign Up
    </Button>
  </Box>
</Box>
    </Box>

  );
}

export default LoginPage;
