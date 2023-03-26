import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
// import Dashboard from './components/Dashboard';
import { useState } from "react";
import SignupPage from "./Pages/SignupPage";
import RootLayout from "./Pages/Root";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorPage from "./Pages/Error";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
