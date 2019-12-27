import React, { Component } from "react";
import PropTypes from "prop-types";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { added: false };
  }

  changeVal(name, event) {
    this.setState({ [name]: event.target.value });
  }

  addProduct() {
    if (this.state.nazwa === null) return;

    const product = {
      id: this.props.productsLength,
      nazwa: this.state.nazwa,
      producent: this.state.producent,
      cena: Math.round(this.state.cena * 100) / 100,
      img: this.state.img,
      ilosc: 0
    };
    this.props.addProduct(product);
  }

  render() {
    return (
      <form style={{ padding: 30 }}>
        {Object.keys(this.props.fields).map((field, index) => {
          let arr = this.props.fields[field];
          if (arr.length > 1) {
            return (
              <p className='input-field' key={index}>
                <label className='active'>{field}</label>
                <input id='input_text' type={arr[0]} value={arr[1]} readOnly />
              </p>
            );
          } else
            return (
              <p className='input-field' key={index}>
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
                  step='0.01'
                  onChange={this.changeVal.bind(this, field)}
                />
              </p>
            );
        })}
        <p>
          <button
            className='waves-effect waves-light btn'
            disabled={
              !this.state.nazwa ||
              !this.state.producent ||
              !this.state.cena ||
              !this.state.img ||
              this.state.nazwa.length > 100 ||
              this.state.producent.length > 100 ||
              this.state.img.length > 1024
            }
            onClick={this.addProduct.bind(this)}
          >
            Dodaj
          </button>
        </p>
      </form>
    );
  }
}

AddProduct.propTypes = {
  fields: PropTypes.objectOf(PropTypes.array),
  addProduct: PropTypes.func,
  productsLength: PropTypes.number
};

export default AddProduct;
