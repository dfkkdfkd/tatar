import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  export const list = (anchor, toggleDrawer, linksList) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="drawerFilter"
    >
      <List>
        {linksList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link className="linkFilter" to={item.link}>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  