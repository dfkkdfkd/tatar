import { useState } from "react";
import axios from "axios";
import { urlItem } from "../../url";
import "./index.css";
import { Button } from "@mui/material";

export const Admin = ({
  setSnackBarStatus,
  setSnackBarText,
  setOpenSnackBar,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, description, price, image, category, color, sizes };
    axios
      .post(`${urlItem}/items`, product)
      .then(() => {
        setOpenSnackBar(true);
        setSnackBarText("Товар добавлен");
        setSnackBarStatus("success");
      })
      .catch(() => {
        setOpenSnackBar(true);
        setSnackBarText("Товар не был добавлен");
        setSnackBarStatus("error");
      });
  };

  return (
    <div className="innerContent">
      <form onSubmit={handleSubmit}>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="name">Название</div>
          <input
            className="inputCustomGlobal"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="description">Описание</div>
          <textarea
            className="inputCustomGlobal inputCustomGlobal-textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="price">Цена(Только цифры)</div>
          <input
            className="inputCustomGlobal"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="image">
            Изображение(Только ссылка на изображение)
          </div>
          <input
            className="inputCustomGlobal"
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="category">Категория(C большой буквы)</div>
          <input
            className="inputCustomGlobal"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="color">Цвет(C большой буквы)</div>
          <input
            className="inputCustomGlobal"
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div className="inputInnerGlobal">
          <div className="inputLabelGlobal" htmlFor="sizes">
            Размеры(Через запятую указывать размеры)
          </div>
          <input
            className="inputCustomGlobal"
            type="text"
            id="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value.split(","))}
            required
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
        >
          Создать
        </Button>
      </form>
    </div>
  );
};
