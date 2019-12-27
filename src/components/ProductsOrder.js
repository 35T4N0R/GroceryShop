import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../index.css";
import { addOrder } from "./actions/actions";

class ProductsOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { added: false };
  }
  changeVal(name, event) {
    this.setState({ [name]: event.target.value });
  }

  addOrder() {
    const order = {
      imie: this.state.imie,
      nazwisko: this.state.nazwisko,
      adres: this.state.adres,
      orderedProducts: this.props.orderedProducts,
      suma: this.props.suma
    };
    this.props.addOrder(order);
  }

  render() {
    return (
      <form style={{ padding: 30 }}>
        {Object.keys(this.props.fields).map(field => {
          let arr = this.props.fields[field];
          return (
            <p className='input-field' key={field}>
              <label
                htmlFor='input_text'
                data-error='wrong'
                data-success='right'
              >
                {field}
              </label>
              <input
                className='validate'
                type={arr[0]}
                required=''
                aria-required='true'
                id='input_text'
                onChange={this.changeVal.bind(this, field)}
              />
            </p>
          );
        })}
        <p>
          <Link to='/orders'>
            <button
              disabled={
                !this.state.imie ||
                !this.state.nazwisko ||
                !this.state.adres ||
                this.state.imie.length > 100 ||
                this.state.nazwisko.length > 100 ||
                this.state.adres.length > 512
              }
              onClick={this.addOrder.bind(this)}
            >
              Dodaj
            </button>
          </Link>
        </p>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    orderedProducts: state.products.addedItems,
    suma: state.products.suma
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addOrder: newOrder => {
      dispatch(addOrder(newOrder));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsOrder);
