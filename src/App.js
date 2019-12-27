import React, { Component } from "react";
import Menu from "./components/Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ManageProducts from "./components/ManageProducts";
import ProductsOrder from "./components/ProductsOrder";
import Orders from "./components/Orders";

class App extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className='App'>
        <BrowserRouter>
          <Menu />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path='/cart'
              render={() => <Cart products={products.addedItems} />}
            />
            <Route path='/manage' component={ManageProducts} />
            <Route
              path='/order'
              render={() => (
                <ProductsOrder
                  fields={{
                    imie: ["text"],
                    nazwisko: ["text"],
                    adres: ["text"]
                  }}
                />
              )}
            />
            )} />
            <Route path='/orders' component={Orders} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
