import React from "react";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <footer style={{ marginTop: "2rem" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Flux Marine. All rights reserved.
      </Typography>
    </footer>
  );
}