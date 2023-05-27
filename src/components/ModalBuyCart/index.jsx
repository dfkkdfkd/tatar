import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { style } from "./style";
import "./ModalBuyCart.css";
import { FormPayment } from "../FormPayment";
import { BuyItems } from "../BuyItems";
import { AcceptPaymentCart } from "../AcceptPaymentCart";
import { urlItem } from "../../url";
import axios from "axios";

const steps = ["Выбор размера", "Оплата", "Подтверждение"];

export const ModalBuyCart = ({
  cost,
  items,
  handleCloseModal,
  openModal,
  setSnackBarText,
  setOpenSnackBar,
  setSnackBarStatus
}) => {
  const [buyItem, setBuyItem] = useState([]);
  const [sizeCheck, setSizeCheck] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formDataPayment, setFormDataPayment] = useState({
    fullnameCustomer: "",
    phoneNumber: "",
    address: "",
    cardNameHolder: "",
    cardNumber: "",
    cardCVV: "",
    cardDate: "",
    email: "",
    complete: false,
  });
  const [buyAccept, setBuyAccept] = useState([]);

  const handleSizeChange = (index, item) => {
    const selectedItem = items[index];
    selectedItem.size = item;

    const updatedItems = [...items];
    updatedItems.splice(index, 1, selectedItem);

    setBuyItem(updatedItems);
  };

  useEffect(() => {
    const sizeItemsLength = buyItem.filter((item) =>
      item.hasOwnProperty("size")
    ).length;
    setSizeCheck(sizeItemsLength === items.length);
  }, [buyItem, items]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formattedPhone = formDataPayment.phoneNumber.split("_")[0];
    if(formattedPhone.length < 17) {
      setSnackBarStatus("error");
      setSnackBarText("Не правильный номер телефона");
      setOpenSnackBar(true);
      return;
    }

    const formattedCardNumber = formDataPayment.cardNumber.split("_")[0];
    if(formattedCardNumber.length < 19) {
      setSnackBarStatus("error");
      setSnackBarText("Не правильный номер карты");
      setOpenSnackBar(true);
      return;
    }

    const formattedDate = formDataPayment.cardDate.split("_")[0]
    if(formattedDate.length < 5) {
      setSnackBarStatus("error");
      setSnackBarText("Не правильная дата");
      setOpenSnackBar(true);
      return;
    }

    const formattedCVV = formDataPayment.cardCVV.split("_")[0]
    if(formattedCVV.length < 3) {
      setSnackBarStatus("error");
      setSnackBarText("Не правильный CVV карты");
      setOpenSnackBar(true);
      return;
    }

    setActiveStep(activeStep + 1);

    const result = {
      info: [formDataPayment],
      items: buyItem,
      cost: cost,
    };
    setBuyAccept(result);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDataPayment({
      ...formDataPayment,
      [name]: value,
    });
  };

  const handleBuyAccept = () => {
    axios.post(`${urlItem}/orders`, buyAccept).then(() => {
      setSnackBarStatus("success");
      setSnackBarText("Заказ создан");
      setOpenSnackBar(true);
      handleCloseModal();
      setFormDataPayment(formDataPayment);
      setActiveStep(0);
      setBuyItem([]);
    })
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="">{steps[activeStep]}</h2>
        {activeStep === 0 ? (
          <>
            <BuyItems
              items={items}
              handleSizeChange={handleSizeChange}
              buyItem={buyItem}
            />
          </>
        ) : (
          <></>
        )}
        {activeStep === 1 ? (
          <>
            <FormPayment
              handleFormSubmit={handleFormSubmit}
              handleInputChange={handleInputChange}
              formDataPayment={formDataPayment}
              setActiveStep={setActiveStep}
              cost={cost}
            />
          </>
        ) : (
          <></>
        )}
        {activeStep === 2 ? (<>
          <AcceptPaymentCart items={buyAccept}/>
        </>) : (<></>)}
        {activeStep + 1 === steps.length ? (
          <>
            <Button
              onClick={handleBuyAccept}
              color="secondary"
              variant="contained"
              className="btnModal__btn"
            >
              Подтвердить
            </Button>
            <Button
              onClick={handleStep(activeStep - (steps.length - 1))}
              color="error"
              variant="contained"
              className="btnModal__btn"
            >
              Изменить
            </Button>
          </>
        ) : (
          <>
            {activeStep === 1 ? (
              <></>
            ) : (
              <>
                {sizeCheck && activeStep === 0 ? (
                  <>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleStep(activeStep + 1)}
                      className="btnModal__btn"
                    >
                      Продолжить
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="contained" disabled className="btnModal__btn">
                      Продолжить
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};
