import React from "react";
import "./AcceptPaymentCart.css";

export const AcceptPaymentCart = ({ items }) => {

  console.log(items);

  return (
    <div>
      <div className="payItems__inner">
        <h3>Ваши товары</h3>
        {items.items.map((data) => (
          <div className="pay__item" key={data.id}>
            <div className="pay__image">
              <img src={data.image} alt="" width="50px" />
            </div>
            <div className="pay__sizeItem">
              <div className="pay__nameItem">{data.name}</div>
              <div className="pay__size">
                Размер: {data.size}
              </div>
            </div>
          </div>
        ))}
        <h3>Данные</h3>
        {items.info.map((data) => (
          <div className="">
            <div className="">
              Ваше имя: {data.fullnameCustomer}
            </div>
            <div className="">
              Ваш телефон: {data.phoneNumber}
            </div>
            <div className="">
              Почта: {data.email}
            </div>
            <div className="">
              Адрес: {data.address}
            </div>
          </div>
        ))}
        <div className="final__cost">Итог: {items.cost}</div>
      </div>
    </div>
  );
};
