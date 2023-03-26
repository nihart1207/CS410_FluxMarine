// Importing necessary dependencies from React and Material UI libraries
import * as React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

// Defining SignupPage component
function SignupPage() {
  // Initializing state variables using the useState hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Defining a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement signup logic
  };

  // Rendering the SignupPage component
  return (
    <Box
      // Styling the main container element using the Material UI Box component
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(36,198,220,0.5), rgba(81,74,157,0.5))",
      }}
    >
      {/* Rendering a heading using the Material UI Typography component */}
      <Typography variant="h4" sx={{ mb: 3, color: "white" }}>
        Signup
      </Typography>
      {/* Rendering a form using the Material UI Box component */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 10,
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        {/* Rendering input fields for username, password, and confirm password using the Material UI TextField component */}
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          sx={{ width: "100%" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        {/* Rendering a submit button using the Material UI Button component */}
        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "secondary.main", color: "white" }}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
}

// Exporting the SignupPage component as the default export
export default SignupPage;
