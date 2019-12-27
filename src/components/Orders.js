import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showOrders } from "./actions/actions";
import "../index.css";

function prod(props, id) {
  let productsInOrder = props.orders[id].orderedProducts.length ? (
    props.orders[id].orderedProducts.map(item => {
      return (
        <div className='collection-item avatar' key={item.nazwa + item.producent}>
          <div className='item-img'>
            <img src={item.img} alt={item.img} className='' />
          </div>
          <div className='item-desc'>
            <p>
              <b>Nazwa produktu: </b>
              {item.nazwa}
              <br />
              <b> Producent: </b>
              {item.producent}
            </p>
            <p>
              <b>Cena: </b>
              {item.cena} zł
            </p>
            <p>
              <b>Ilość: </b>
              {item.ilosc}
            </p>
          </div>
        </div>
      );
    })
  ) : (
    <p>Brak zamówień.</p>
  );
  return productsInOrder;
}

function Orders(props) {
  useEffect(() => {
    props.showOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let orders = props.orders.length ? (
    props.orders.map((item, index) => {
      return (
        <li className='collection-item avatar' key={index}>
          <div className='item-desc'>
            <p>
              <b>Imie: </b>
              {item.imie}
              <br />
              <b> Nazwisko: </b>
              {item.nazwisko}
              <br />
              <b> Adres: </b>
              {item.adres}
            </p>
            <p>
              <b>Suma: </b>
              {Math.round(item.suma * 100) / 100} zł
            </p>
            <div className='box'>{prod(props, index)}</div>
          </div>
        </li>
      );
    })
  ) : (
    <p style={{ padding: 30 }}>Nie ma nic do zamówienia.</p>
  );
  return (
    <div>
      <div className='container'>
        <div className='cart'>
          <h4 className='center '>Zamówienia</h4>
          <div className='collection'>{orders}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.products.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showOrders: () => {
      dispatch(showOrders());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
