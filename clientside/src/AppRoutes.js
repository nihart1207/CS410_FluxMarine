import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;