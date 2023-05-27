import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import axios from "axios";
import { urlItem } from "../../url";
import { Button, CircularProgress, Drawer } from "@mui/material";
import { list } from "./list";
import { useLocation } from "react-router-dom";
import "./index.css";

export const Catalog = ({
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
  uniqueCategories
}) => {
  const urlLink = useLocation();
  const urlSearch = useLocation();
  const [items, setItems] = useState([]);
  const [drawerFilter, setDrawerFilter] = useState({
    left: false,
  });
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    axios.get(`${urlItem}/items${urlSearch.search}`).then((data) => {
      setItems(data.data);
      setIsLoaded(false);
    });
  }, [urlSearch]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerFilter({ ...drawerFilter, [anchor]: open });
  };

  return (
    <>
      {isLoaded ? (
        <div className="isEmpty">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="innerContent">
          <>
            <Button onClick={toggleDrawer("left", true)}>Фильтры</Button>
            <Drawer
              anchor="left"
              open={drawerFilter["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left", toggleDrawer, uniqueCategories, urlLink)}
            </Drawer>
          </>
          <div className="homeInner">
            {items.map((data) => (
              <Card
                setSnackBarStatus={setSnackBarStatus}
                setSnackBarText={setSnackBarText}
                setOpenSnackBar={setOpenSnackBar}
                data={data}
                key={data.id}
                link={urlLink.pathname}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
