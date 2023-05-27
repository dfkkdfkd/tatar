import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import axios from "axios";
import { urlCartLike } from "../../url";
import { useLocation } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import "./Cart.css";
import { ModalBuyCart } from "../ModalBuyCart";

export const Cart = ({
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
  openSnackBar,
}) => {
  const urlLink = useLocation();
  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [cost, setCost] = useState(Number);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      const price = parseFloat(items[i].price);
      if (!isNaN(price)) {
        sum += price;
      }
    }
    sum *= 1.12;
    return setCost(Math.round(sum));
  }, [items]);

  return (
    <>
      {isLoaded ? (
        <div className="isEmpty">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className="isEmpty">Корзина пуста : (</div>
          ) : (
            <div className="innerContent">
              <div className="homeInner cartItemInner">
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
              <div className="footerCart">
                <div className="footerCartInner">
                  <div className="">Итог: </div>
                  <div className="">{cost}</div>
                  <div className="">
                    <Button
                      onClick={() => handleOpenModal()}
                      variant="contained"
                      color="secondary"
                    >
                      Купить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ModalBuyCart
        setSnackBarText={setSnackBarText}
        setOpenSnackBar={setOpenSnackBar}
        setSnackBarStatus={setSnackBarStatus}
        cost={cost}
        items={items}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};
