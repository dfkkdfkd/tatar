import React from "react";

export const BuyItems = ({ items, handleSizeChange, buyItem }) => {
  return (
    <div className="payItems__inner">
      {items.map((data, index) => (
        <div className="pay__item" key={data.id}>
          <div className="pay__image">
            <img src={data.image} alt="" width="50px" />
          </div>
          <div className="pay__sizeItem">
            <div className="pay__nameItem">
                {data.name}
            </div>
            <div className="pay__sizePicker">
              {data.sizes.map((item) => (
                <button
                  className={`pay__sizeBtn ${buyItem[index]?.size === item ? "pay__sizeBtn-active" : "pay__sizeBtn-nonactive"}`}
                  onClick={() => handleSizeChange(index, item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
