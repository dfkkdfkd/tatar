import React from "react";
import "./FormPayment.css";
import ReactInputMask from "react-input-mask";
import { Button } from "@mui/material";

export const FormPayment = ({
  handleFormSubmit,
  formDataPayment,
  handleInputChange,
  setActiveStep,
  cost,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="">Ваше имя</div>
      <input
      className="form__infoInput"
        type="text"
        name="fullnameCustomer"
        id="fullnameCustomer"
        value={formDataPayment.fullnameCustomer}
        onChange={handleInputChange}
        required
      />

      <div className="">Номер телефона</div>
      <ReactInputMask
      className="form__infoInput"
        mask="+9 (999) 999-9999"
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        value={formDataPayment.phoneNumber}
        onChange={handleInputChange}
        required
      />

      <div className="">Адрес</div>
      <input
      className="form__infoInput"
        type="text"
        name="address"
        id="address"
        value={formDataPayment.address}
        onChange={handleInputChange}
        required
      />

      <div className="">Почта</div>
      <input
      className="form__infoInput"
        type="email"
        name="email"
        id="email"
        value={formDataPayment.email}
        onChange={handleInputChange}
        required
      />

      <div className="c__card">
        <div className="c__cardInner">
          <ReactInputMask
            className="c__cardInput"
            mask="9999 9999 9999 9999"
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={formDataPayment.cardNumber}
            onChange={handleInputChange}
            placeholder="0000 0000 0000 0000"
            required
          />

          <div className="c__cardBottom">
            <div className="c__cardBottomItem">
              <ReactInputMask
                className="c__cardInput"
                mask="99/99"
                type="text"
                name="cardDate"
                id="cardDate"
                value={formDataPayment.cardDate}
                onChange={handleInputChange}
                placeholder="DD/MM"
                required
              />

              <input
                className="c__cardInput"
                type="text"
                name="cardNameHolder"
                id="cardNameHolder"
                value={formDataPayment.cardNameHolder}
                onChange={handleInputChange}
                placeholder="Name Surname"
                required
              />
            </div>
            <div className="c__cardBottomItem">
              <ReactInputMask
                className="c__cardInput"
                mask="999"
                type="text"
                name="cardCVV"
                id="cardCVV"
                value={formDataPayment.cardCVV}
                onChange={handleInputChange}
                placeholder="000"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form__cost">Цена: {cost}</div>

      <Button className="btnModal__btn" color="secondary" variant="contained" type="submit">
        Оплата
      </Button>
      <Button className="btnModal__btn" color="error" variant="contained" onClick={() => setActiveStep(0)}>
        Изменить размер
      </Button>
    </form>
  );
};
