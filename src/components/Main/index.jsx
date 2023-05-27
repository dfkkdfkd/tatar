import React, { useEffect, useState } from 'react'
import "./index.css";
import bg_back from "../../assets/bg_back.png";
import about__bg from "../../assets/about__bg.jpg";
import tg from "../../assets/tg.svg";
import { Link } from 'react-router-dom';

export const Main = ({ uniqueCategories, itemsArray }) => {
  const [randomGoods, setRandomGoods] = useState([]);

  function randomObjects(array) {
    const randomObjects = [];
  
    while (randomObjects.length < Math.min(8, array.length)) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomObject = array[randomIndex];
      if (!randomObjects.includes(randomObject)) {
        randomObjects.push(randomObject);
      }
    }
    
    return randomObjects;
  }

  useEffect(() => {
    setRandomGoods(randomObjects(itemsArray))
  }, [itemsArray])

  return (
    <>
      <section className="mainSection">
        <div className="mainSection__img">
            <img src={bg_back} alt="" />
          </div>
          <div>
            <p className="descMainSection">Наш интернет-магазин предлагает широкий выбор стильной и качественной одежды для мужчин. Мы уделяем особое внимание последним модным тенденциям, чтобы предложить нашим клиентам актуальные и современные варианты. <br/> Независимо от вашего стиля или предпочтений, у нас вы найдете разнообразие товаров, от повседневных базовых элементов гардероба до элегантных и стильных нарядов для особых случаев.</p>
          </div>
      </section>
      <section className="filterSection">
        <div className="filterSection__inner">
          {uniqueCategories.map((data) => (
            <Link className="filterItem" to={`/catalog?search&category=${data}`}>
              <div key={data}>{data}</div>
            </Link>
          ))}
        </div>
      </section>
      <section className="popularProd">
        <div className="popularProd__inner">
          <div className="popularProd__title">
            <h2>Популярные товары</h2>
          </div>
          <div className="popularProd__item-inner">
            {randomGoods.map((data) => (
              <div className="popularProd__item-wrapper">
                <Link key={data.id} to={`/item/${data.id}`}>
                  <div className="popularProd__item">
                    <div className="popularProd__img">
                      <img src={data.image} alt=""/>
                    </div>
                    <div className="popularProd__name">
                      <h3>
                        {data.name}
                      </h3>
                    </div>
                    <div className="popularProd__price">
                      <span>
                        {data.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="about">
        <div className="about__inner">
          <div className="about__text">
            <div className="about__text-title">
              <h2>О нас</h2>
            </div>
            <div className="about__text-text">
              <p>
                Мы гордимся высоким качеством наших продуктов и работаем только с надежными поставщиками, чтобы гарантировать долговечность и комфорт нашей одежды. Наш сайт обеспечивает удобный и интуитивно понятный интерфейс, где вы можете легко найти и выбрать то, что нужно. Мы также предлагаем удобные опции оплаты и доставки, чтобы обеспечить приятный опыт покупок онлайн. 
              </p>
            </div>
          </div>
          <div className="about__image">
            <img src={about__bg} alt="" />
          </div>
        </div>
      </section>
      <section id="contact" className="social">
        <div className="social__inner">
          <div className="social__text">
            <a className='social__text-desc' href="tel:+77002664020">+7 700 266 40 20</a>
            <h3 className='social__text-desc'>hello@ascent.com</h3>
          </div>
          <div className="social__social">
            <a href="https://t.me/lasahal">
              <img src={tg} alt="tel" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
