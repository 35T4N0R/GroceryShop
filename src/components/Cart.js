import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../index.css";
import {
  showSum,
  showCart,
  addSuma,
  removeFromCart,
  updateIlosc
} from "./actions/actions";

function Cart(props) {
  useEffect(() => {
    props.showCart();
    props.showSum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let items = props.products.length ? (
    props.products.map(item => {
      return (
        <li className='collection-item avatar' key={item.id}>
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
            <div>
              <Link to='/cart'>
                <i
                  className='material-icons'
                  onClick={() => {
                    props.updateIlosc(item.id, false);
                  }}
                >
                  exposure_neg_1
                </i>
              </Link>
              <Link to='/cart'>
                <i
                  className='material-icons'
                  onClick={() => {
                    props.updateIlosc(item.id, true);
                  }}
                >
                  exposure_plus_1
                </i>
              </Link>
            </div>
            <button
              className='btn-floating  btn-large waves-effect waves-light btn green remove'
              onClick={() => {
                props.removeFromCart(item.id);
              }}
            >
              <i className='material-icons'>remove_shopping_cart</i>
            </button>
          </div>
        </li>
      );
    })
  ) : (
    <p style={{ padding: 30 }}>Koszyk jest pusty.</p>
  );
  return (
    <div>
      <div className='container'>
        <div className='cart'>
          <h4 className='center '>Koszyk</h4>
          <div className='collection'>{items}</div>
        </div>
      </div>
      <div className='container'>
        <div className='collection'>
          <li className='collection-item'>
            <b>Suma do zapłaty: {Math.round(props.suma * 100) / 100} zł</b>
          </li>
        </div>
        <Link to='/order'>
          <button className='btn  waves-effect waves-light btn green'>
            Zamów
          </button>
        </Link>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.products.addedItems,
    suma: state.products.suma
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: id => {
      dispatch(removeFromCart(id));
    },
    showCart: () => {
      dispatch(showCart());
    },
    showSum: () => {
      dispatch(showSum());
    },
    addSuma: suma => {
      dispatch(addSuma(suma));
    },
    updateIlosc: (id, czyDodac) => {
      dispatch(updateIlosc(id, czyDodac));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
