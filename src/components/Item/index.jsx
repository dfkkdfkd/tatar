import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlCartLike, urlItem } from "../../url";
import "./Item.css";
import { Button, CircularProgress } from "@mui/material";
import cart from "../../assets/cart-white.svg";
import like from "../../assets/like-white.svg";

export const Item = ({
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
}) => {
  const urlLink = useParams();
  const [item, setItem] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    axios.get(`${urlItem}/items/${urlLink.idItem}`).then((data) => {
      setItem(data.data);
      setIsLoaded(false);
    });
  }, [urlLink]);

  const handleAddToCart = (data) => {
    axios
      .post(`${urlCartLike}/cart`, {
        idItem: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        color: data.color,
        sizes: data.sizes,
      })
      .then(() => {
        setSnackBarStatus("success");
        setSnackBarText("Добавленно в корзину");
        setOpenSnackBar(true);
      });
  };

  const handleAddToLike = (data) => {
    axios
      .post(`${urlCartLike}/like`, {
        idItem: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        color: data.color,
        sizes: data.sizes,
      })
      .then(() => {
        setSnackBarStatus("success");
        setSnackBarText("Добавленно в избранное");
        setOpenSnackBar(true);
      });
  };

  return (
    <>
      {isLoaded ? (
        <div className="isEmpty">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="innerContent">
          <div className="itemInner">
            <div className="item__imageInner">
              <img src={item.image} alt="" />
            </div>
            <div className="item__contentInner">
              <div className="item__nameContent">{item.name}</div>
              <div className="item__descContent">
                <p>{item.description}</p>
              </div>
							<div className="item__itemColor">
								Цвет: {item.color}
							</div>
							<div className="item_itemSize">
								Размеры: {item.sizes}
							</div>
              <div className="item__btnsContent">
								<Button className="item__btnItem" onClick={() => handleAddToCart(item)} variant="outlined"><img className="iconBtn" src={cart} alt="" /><div className="item__itemBtnText">В корзину</div></Button>
								<Button className="item__btnItem" onClick={() => handleAddToLike(item)} variant="outlined" color="error"><img className="iconBtn" src={like} alt="" /><div className="item__itemBtnText">В избранное</div></Button>
							</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
