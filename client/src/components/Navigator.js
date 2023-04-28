import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Typography } from "@mui/material";

const categories = [
  {
    id: "",
    children: [
      { id: "Dashboard", icon: <DashboardOutlinedIcon /> },
      { id: "Orders", icon: <AddShoppingCartOutlinedIcon /> },
      { id: "Parts", icon: <Inventory2OutlinedIcon /> },
      { id: "Suppliers", icon: <LocalShippingOutlinedIcon /> },
      { id: "Users", icon: <GroupAddOutlinedIcon />,},
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { changeContent, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List>
        <ListItem 
          sx={{ ...item, ...itemCategory, fontSize: 30, color: "#fff" }}
        >
          FLUX MARINE
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "black", height: "100%" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} 
                onClick={() => changeContent(childId)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
