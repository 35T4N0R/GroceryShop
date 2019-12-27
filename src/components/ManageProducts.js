import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showAll,
  addProduct,
  editProduct,
  removeProduct
} from "./actions/actions";
import ProductsList from "./ProductsList";
import AddProduct from "./AddProduct";

class ManageProducts extends Component {
  componentDidMount() {
    this.props.showAll();
  }

  onProductSelected = selectedProduct => {
    this.setState({
      selectedProduct
    });
  };

  add(product) {
    this.props.addProduct(product);
  }

  render() {
    const { products, editProduct, removeProduct } = this.props;
    let array = products.productsList;
    let lastOfArray = array[array.length - 1];
    if (typeof lastOfArray !== typeof undefined) {
      let lastId = lastOfArray.id + 1;
      return (
        <div>
          <AddProduct
            fields={{
              id: ["number", lastId],
              nazwa: ["text"],
              producent: ["text"],
              cena: ["number"],
              img: ["text"]
            }}
            addProduct={this.add.bind(this)}
            productsLength={lastId}
          />
          {products.loaded && (
            <ProductsList
              updateProduct={editProduct}
              deleteProduct={removeProduct}
              products={products.productsList}
            />
          )}
        </div>
      );
    } else {let lastId = 0;
    return (
      
      <AddProduct
            fields={{
              id: ["number", lastId],
              nazwa: ["text"],
              producent: ["text"],
              cena: ["number"],
              img: ["text"]
            }}
            addProduct={this.add.bind(this)}
            productsLength={lastId}
          />
    );
          }
  }
}

const mapStateToProps = state => {
  return { ...state };
};
const mapDispatchToProps = dispatch => {
  return {
    showAll: () => dispatch(showAll()),
    addProduct: new_product => dispatch(addProduct({ data: new_product })),
    editProduct: (updated_product, id) =>
      dispatch(editProduct({ data: updated_product, id: id })),
    removeProduct: (removed_product, id) =>
      dispatch(removeProduct({ data: removed_product, id: id }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
