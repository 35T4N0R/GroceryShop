import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { connect, Provider } from "react-redux";
import root_reducers from "./components/reducers";
import {
  showAll,
  addProduct,
  editProduct,
  removeProduct
} from "./components/actions/actions";
import thunk from "redux-thunk";
import "./index.css";

const store = createStore(root_reducers, applyMiddleware(thunk));

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

const ManageProducts = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}>
    <ManageProducts />
  </Provider>,
  document.getElementById("root")
);
