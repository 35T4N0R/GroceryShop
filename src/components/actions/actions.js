import axios from "axios";
export const SHOW_CART = "SHOW_CART";
export const SHOW_SUM = "SHOW_SUM";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_SUMA = "ADD_SUMA";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_ILOSC = "UPDATE_ILOSC";
export const ADD_ORDER = "ADD_ORDER";
export const SHOW_ORDERS = "SHOW_ORDERS";
export const SHOW_ALL = "SHOW_ALL";

export const showAll = () => dispatch => {
  axios({ url: "http://localhost:8080/products" })
    .then(res => {
      dispatch(showAllAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const showAllAction = data => ({
  type: SHOW_ALL,
  products: data
});

export const showOrders = () => dispatch => {
  axios({ url: "http://localhost:8080/orders" })
    .then(res => {
      dispatch(showOrderAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const showCart = () => dispatch => {
  axios({ url: "http://localhost:8080/cartProducts" })
    .then(res => {
      dispatch(showCartAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const showSum = () => dispatch => {
  axios({ url: "http://localhost:8080/suma" })
    .then(res => {
      dispatch(showSumAction(res.data.suma));
    })
    .catch(error => {
      throw error;
    });
};

export const addProduct = new_product => dispatch => {
  axios({
    url: "http://localhost:8080/products",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(new_product)
  })
    .then(res => {
      dispatch(addProductAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const addToCart = item => dispatch => {
  axios({
    url: "http://localhost:8080/cartProducts",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(item)
  })
    .then(res => {
      dispatch(addToCartAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const addSuma = cena => dispatch => {
  let cenaTmp = { cena: cena };
  axios({
    url: "http://localhost:8080/suma",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(cenaTmp)
  })
    .then(res => {
      dispatch(addSumaAction(res.data.cena));
    })
    .catch(error => {
      throw error;
    });
};

export const editProduct = updatedProduct => dispatch => {
  console.log(updatedProduct.id)
  axios({
    url: `http://localhost:8080/products/${updatedProduct.id}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(updatedProduct)
  })
    .then(res => {
      dispatch(editProductAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const removeProduct = removedProduct => dispatch => {
  axios({
    url: `http://localhost:8080/products/${removedProduct.id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(removedProduct)
  })
    .then(res => {
      dispatch(removeProductAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const removeFromCart = id => dispatch => {
  axios({
    url: `http://localhost:8080/cart/${id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      dispatch(removeFromCartAction(res.data.id));
    })
    .catch(error => {
      throw error;
    });
};

/*export const updateIlosc = (id, czyDodac) => dispatch => {
  axios({
    url: `http://localhost:8080/cart/${id}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify({ czyDodac: czyDodac })
  })
    .then(res => {
      dispatch(editProductAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};*/

export const addOrder = newOrder => dispatch => {
  axios({
    url: "http://localhost:8080/orders",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(newOrder)
  })
    .then(res => {
      dispatch(addOrderAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};

export const updateIlosc = (id,czyDodac) => dispatch => {
  axios({
    url: `http://localhost:8080/cart/${id}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify({czyDodac: czyDodac})
  })
    .then(res => {
      dispatch(updateIloscAction(res.data));
    })
    .catch(error => {
      throw error;
    });
};


export const updateIloscAction=(data)=>(
{
  type: UPDATE_ILOSC,
  id : data.updated.id,
  czyDodac: data.czyDodac
}
)

export const showOrderAction = data => ({
  type: SHOW_ORDERS,
  orders: data
});

export const addOrderAction = newOrder => ({
  type: ADD_ORDER,
  newOrder
});

/*export const updateIloscAction = (id, czyDodac) => ({
  type: UPDATE_ILOSC,
  id,
  czyDodac
});*/

export const removeFromCartAction = id => ({
  type: REMOVE_FROM_CART,
  id
});

export const addToCartAction = data => ({
  type: ADD_TO_CART,
  added: data
});

export const addSumaAction = cena => ({
  type: ADD_SUMA,
  cena
});


export const showCartAction = data => ({
  type: SHOW_CART,
  cartProducts: data
});

export const showSumAction = data => ({
  type: SHOW_SUM,
  suma: data
});
export const addProductAction = new_product => ({
  type: ADD_PRODUCT,
  new_product
});

export const editProductAction = updated_product => ({
  type: EDIT_PRODUCT,
  updated_product
});

export const removeProductAction = removed_product => ({
  type: REMOVE_PRODUCT,
  removed_product
});
