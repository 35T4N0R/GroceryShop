import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  showAll,
  showSum,
  showCart,
  addToCart,
  addSuma
} from "./actions/actions";
import "../index.css";
import Select from 'react-select';

const options = [
  { value: 'reset', label: 'Kolejność Podstawowa' },
  { value: 'nazwa_asc', label: 'Nazwy - od A do Z' },
  { value: 'nazwa_desc', label: 'Nazwy - od Z do A' },
  { value: 'producent_asc', label: 'Producenta - od A do Z' },
  { value: 'producent_desc', label: 'Producenta - od Z do A' },
  { value: 'cena_asc', label: 'Ceny Rosnąco' },
  { value: 'cena_desc', label: 'Ceny Malejąco' },
];


function Home(props) {

  const [selectedOption, setSelectedOption] = useState(null);


  let handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
    switch(selectedOption.value){
      case 'reset':
        props.products.sort((a, b) => (a.id > b.id) ? 1 : -1)
        break;
      case 'cena_asc':
        props.products.sort((a, b) => (a.cena > b.cena) ? 1 :(a.cena === b.cena) ? ((a.nazwa > b.nazwa) ? 1 : -1): -1)
        break;
      case 'cena_desc':
        props.products.sort((a, b) => (a.cena < b.cena) ? 1 :(a.cena === b.cena) ? ((a.nazwa > b.nazwa) ? 1 : -1): -1)
        break;
      case 'nazwa_asc':
        props.products.sort((a, b) => (a.nazwa > b.nazwa) ? 1 : -1)
        break;
      case 'nazwa_desc':
        props.products.sort((a, b) => (a.nazwa < b.nazwa) ? 1 : -1)
        break;
      case 'producent_asc':
        props.products.sort((a, b) => (a.producent > b.producent) ? 1 : -1)
        break;
      case 'producent_desc':
        props.products.sort((a, b) => (a.producent < b.producent) ? 1 : -1)
        break;
      default:
        props.products.map();
    }
    console.log(props.products);
  };
  

  useEffect(() => {
    props.showAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let itemList = props.products.map(item => {
    return (
      <div className='card' key={item.id}>
        <div className='card-image'>
          <div className='item-img'>
            <img src={item.img} alt={item.nazwa} />
          </div>
        </div>

        <div className='card-content '>
          <hr />
          <p>
            <b>Nazwa produktu: </b>
            {item.nazwa}
            <br />
            <b> Producent: </b>
            {item.producent}
          </p>
          <br />
          <p>
            <b>Cena: </b>
            {item.cena} zł
          </p>
          <span
            to='/'
            className='btn-floating halfway-fab btn-large waves-effect waves-light green'
            style={{ bottom: "10px" }}
            onClick={() => {
              props.addToCart(item);
              props.addSuma(item.cena);
            }}
          >
            <i className='material-icons'>add_shopping_cart</i>
          </span>
        </div>
      </div>
    );
  });
  return (
    <div><h3 className='center '>Produkty w sklepie</h3>
    <h5>Posortuj według:</h5>
<Select
  value={selectedOption}
  onChange={handleChange}
  options={options}
/>
    <div className='box'>{itemList}</div>

    </div>
  );
}


const mapStateToProps = state => {
  return {
    products: state.products.productsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAll: () => {
      dispatch(showAll());
    },
    showCart: () => {
      dispatch(showCart());
    },
    showSum: () => {
      dispatch(showSum());
    },
    addToCart: id => {
      dispatch(addToCart(id));
    },
    addSuma: cena => {
      dispatch(addSuma(cena));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
