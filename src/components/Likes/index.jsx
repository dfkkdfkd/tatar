import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import axios from "axios";
import { urlCartLike } from "../../url";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const Likes = ({
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
  openSnackBar,
}) => {
  const urlLink = useLocation();
  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    axios.get(`${urlCartLike + urlLink.pathname}`).then((data) => {
      if (data.data.length > 0) {
        setIsEmpty(false);
        setItems(data.data);
        setIsLoaded(false);
      } else {
        setIsEmpty(true);
        setItems(data.data);
        setIsLoaded(false);
      }
    });
  }, [openSnackBar, urlLink]);

  return (
    <>
      {isLoaded ? (
        <div className="isEmpty">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className="isEmpty">Ничего не добавленно</div>
          ) : (
            <div className="innerContent">
              <div className="homeInner">
                {items.map((data) => (
                  <Card
                    setSnackBarStatus={setSnackBarStatus}
                    setSnackBarText={setSnackBarText}
                    setOpenSnackBar={setOpenSnackBar}
                    data={data}
                    link={urlLink.pathname}
                    key={data.id}
                    idItem={data.idItem}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
