import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./components/Dashboard";
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
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
