import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";

export const list = (anchor, toggleDrawer, uniqueCategories, urlLink) => (
  <Box
    sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    className="drawerFilter"
  >
    <List>
      <ListSubheader component="div" id="nested-list-subheader" className="drawerTitle">
        Одежда
      </ListSubheader>
      {uniqueCategories.map((text) => (
        <ListItem key={text} disablePadding>
          <Link className="linkFilter" to={`?search&category=${text}`}>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
    {urlLink.search === "" ? (
      <></>
    ) : (
      <Link className="linkFilter filterClear" to="/catalog">
        <Button variant="contained" color="error">
          Сбросить фильтры
        </Button>
      </Link>
    )}
  </Box>
);
