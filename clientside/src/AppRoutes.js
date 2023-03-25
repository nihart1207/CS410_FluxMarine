import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path= "/signup" element = {<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;