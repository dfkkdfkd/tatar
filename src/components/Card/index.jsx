import { urlCartLike } from "../../url";
import axios from "axios";
import "./Card.css";
import cart from "../../assets/cart.svg";
import like from "../../assets/like.svg";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";

export const Card = ({
  data,
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
  link,
  idItem,
}) => {
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

  const handleDelete = (id) => {
    axios.delete(`${urlCartLike + link}/${id}`).then(() => {
      setSnackBarStatus("error");
      setSnackBarText("Удаленно");
      setOpenSnackBar(true);
    });
  };

  return (
    <div className="cardItem">
      <div className="cardTop">
        <Link to={`/item/${link === "/catalog" ? data.id : idItem}`}>
          <img className="cardImage" src={data.image} alt="" />
        </Link>
        <Link to={`/item/${link === "/catalog" ? data.id : idItem}`}>
          <h3 title={data.name} className="cardDesc">
            {data.name}
          </h3>
        </Link>
        <p title={data.description} className="cardDesc">
          {data.description}
        </p>
        <div className="cardPrice">Цена: {data.price}</div>
      </div>
      <div className="cardBottom">
        {link === "/like" || ("/cart" && link !== "/catalog") ? (
          <>
            {link === "/like" ? (
              <>
                <button
                  title="Добавить в корзину"
                  className="buttonCard"
                  onClick={() => handleAddToCart(data)}
                >
                  <img className="iconBtn" src={cart} alt="" />
                </button>
                <button
                  title="Удалить"
                  className="buttonCard deleteBtnCartLike"
                  onClick={() => handleDelete(data.id)}
                >
                  <img className="iconBtn" src={cross} alt="" />
                </button>
              </>
            ) : (
              <>
                <button
                  title="Удалить"
                  className="buttonCard deleteBtnCartLike"
                  onClick={() => handleDelete(data.id)}
                >
                  <img className="iconBtn" src={cross} alt="" />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              title="Добавить в корзину"
              className="buttonCard"
              onClick={() => handleAddToCart(data)}
            >
              <img className="iconBtn" src={cart} alt="" />
            </button>
            <button
              title="Добавить в избранное"
              className="buttonCard"
              onClick={() => handleAddToLike(data)}
            >
              <img className="iconBtn" src={like} alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
