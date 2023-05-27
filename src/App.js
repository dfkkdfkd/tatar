import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog, Likes, Header, Cart, SnackBar, Admin, Item, Main } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlItem } from "./url";

function App() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${urlItem}/items`).then((data) => {
      setItems(data.data);
    });
  }, []);

  const categories = items.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              uniqueCategories={uniqueCategories}
              itemsArray={items}
            />
          }
        />
        <Route
          path="/catalog"
          search="?search="
          element={
            <Catalog
              setSnackBarStatus={setSnackBarStatus}
              setSnackBarText={setSnackBarText}
              setOpenSnackBar={setOpenSnackBar}
              uniqueCategories={uniqueCategories}
            />
          }
        />
        <Route
          path="/like"
          element={
            <Likes
              openSnackBar={openSnackBar}
              setSnackBarStatus={setSnackBarStatus}
              setSnackBarText={setSnackBarText}
              setOpenSnackBar={setOpenSnackBar}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              openSnackBar={openSnackBar}
              setSnackBarStatus={setSnackBarStatus}
              setSnackBarText={setSnackBarText}
              setOpenSnackBar={setOpenSnackBar}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              setSnackBarStatus={setSnackBarStatus}
              setSnackBarText={setSnackBarText}
              setOpenSnackBar={setOpenSnackBar}
            />
          }
        />
        <Route path="/item/:idItem" element={
          <Item setSnackBarStatus={setSnackBarStatus}
          setSnackBarText={setSnackBarText}
          setOpenSnackBar={setOpenSnackBar}/>
        }/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <SnackBar
        setOpenSnackBar={setOpenSnackBar}
        openSnackBar={openSnackBar}
        snackBarStatus={snackBarStatus}
        snackBarText={snackBarText}
      />
    </div>
  );
}

export default App;
