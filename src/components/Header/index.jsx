import { Link } from 'react-router-dom'
import "./Header.css";
import bg_back from "../../assets/bg_back.png";
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { list } from './list';
import { useState } from 'react';

const linksList = [
  {
    "name": "Каталог",
    "link": "/catalog",
    "id": "catalog"
  }, 
  {
    "name": "Избранное",
    "link": "/like",
    "id": "like"
  }, 
  {
    "name": "Корзина",
    "link": "/cart",
    "id": "cart"
  },
  {
    "name": "О нас",
    "link": "/#about",
    "id": "about"
  },
  {
    "name": "Контакты",
    "link": "/#contact",
    "id": "contact"
  },
  {
    "name": "Админ",
    "link": "/admin",
    "id": "admin"
  }
]

export const Header = () => {
  const [drawerFilter, setDrawerFilter] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerFilter({ ...drawerFilter, [anchor]: open });
  };

  return (
    <header className="header">
        <div className="header__inner">
            <div className="header__right">
              <Link to="/">
                <img className="logoHeader" src={bg_back} alt="" />
              </Link>
            </div>
            <div className="header__left">
              <div className="header__left-items">
                {linksList.map((item) => (
                  <Link key={item.id} id={item.id} className='linkItemUrl' to={item.link}>{item.name}</Link>
                ))}
              </div>
              <IconButton className="header__left-menuburger" onClick={toggleDrawer("right", true)}>
                <MenuIcon color="primary"/>
              </IconButton>
            </div>
        </div>
        <Drawer
          anchor="right"
          open={drawerFilter["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right", toggleDrawer, linksList)}
        </Drawer>
    </header>
  )
}
