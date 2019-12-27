import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { removeFromCart } from "./actions/actions";
import "../index.css";

class ProductsList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  finishEdit(e) {
    this.setState({
      edit: false,
      idProdToEdit: -1
    });
    console.log("list")
    console.log(this.state.idProdToEdit);
    this.props.updateProduct(this.state.editedProduct, this.state.idProdToEdit);
    this.props.removeFromCart(this.state.idProdToEdit);
  }

  finishDelete(e) {
    this.setState({
      edit: false,
      idProdToEdit: -1
    });
    this.props.deleteProduct(this.state.editedProduct, this.state.idProdToEdit);
    this.props.removeFromCart(this.state.idProdToEdit);
  }

  editProduct(id, e) {
    console.log("State")
    console.log(id)
    this.setState({
      edit: true,
      idProdToEdit: id,
      editedProduct: this.props.products[id]
    });
  }

  changeVal(fieldKey, e) {
    let newVal = e.currentTarget.value;
    let prod = Object.assign({}, this.state.editedProduct);
    let i = 0;
    for (let propName in prod) {
      if (i === fieldKey) prod[propName] = newVal;
      if(fieldKey === 3){
            prod.cena = parseFloat(newVal);
            prod.cena = Math.round(prod.cena * 100) / 100;
      }

      i++;
    }


    this.setState({
      editedProduct: prod
    });
  }
  render() {
    if (this.props.products.length > 0) {
      return (
        <ul>
          {this.props.products.map((product, index) => {
            if (product.id !== this.state.idProdToEdit)
              return (
                <li
                  style={{ paddingLeft: 30 }}
                  onClick={this.editProduct.bind(this, product.id)}
                  key={product.id + product.nazwa + product.producent}
                >
                  <p className='materialize-textarea'>
                    {"Id " +
                      product.id +
                      ": " +
                      product.nazwa +
                      " " +
                      product.producent +
                      ", cena: " +
                      product.cena}
                  </p>
                </li>
              );
            else
              return (
                <div key={product.nazwa + product.producent}>
                  <h5 style={{ paddingLeft: 30 }}>
                    {"Id " +
                      product.id +
                      ": " +
                      product.nazwa +
                      " " +
                      product.producent +
                      ", cena: " +
                      product.cena}
                  </h5>
                  <li>
                    <form
                      style={{ paddingLeft: 30 }}
                      onSubmit={this.finishEdit.bind(
                        this,
                        this.state.editedProduct
                      )}
                    >
                      {Object.values(product).map((field, fieldKey) => {
                        return (
                          <p key={fieldKey}>
                            <input
                              className='input-field'
                              defaultValue={field}
                              onChange={this.changeVal.bind(this, fieldKey)}
                            />
                          </p>
                        );
                      }, this)}
                      <input
                        className='waves-effect waves-light btn'
                        type='submit'
                        value='Update'
                      />
                      <input
                        className='waves-effect waves-light btn'
                        type='button'
                        value='Remove'
                        onClick={this.finishDelete.bind(this)}
                      />
                    </form>
                  </li>
                </div>
              );
          })}
        </ul>
      );
    }

    return <p>No results!</p>;
  }
}

ProductsList.propTypes = {
  updateProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object),
  edit: PropTypes.bool,
  idProdToEdit: PropTypes.number
};

const mapStateToProps = state => {
  return {
    edit: false,
    idProdToEdit: -1,
    editedProduct: null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: id => {
      dispatch(removeFromCart(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
