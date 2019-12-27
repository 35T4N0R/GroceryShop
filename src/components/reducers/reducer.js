export default function products(
  state = {
    productsList: [],
    addedItems: [],
    orders: [],
    loaded: false,
    suma: 0
  },
  action
) {
  let new_state;
  switch (action.type) {
    case "SHOW_ALL":
      new_state = Object.assign({}, state);
      new_state.productsList = action.products;
      new_state.loaded = true;
      return new_state;
    case "ADD_TO_CART":
      new_state = Object.assign({}, state);

      let addedItem = state.productsList.find(
        item => item.id === action.added.id
      );

      let existed_item = state.addedItems.find(
        item => item.id === action.added.id
      );

      if (!existed_item) {
        addedItem.ilosc = 1;
        new_state.addedItems.push(addedItem);
      } else {
        new_state.addedItems.find(
          item => item.id === existed_item.id
        ).ilosc += 1;
      }
      return new_state;

    case "SHOW_ORDERS":
      new_state = Object.assign({}, state);
      new_state.orders = action.orders;
      new_state.loaded = true;
      return new_state;
    case "SHOW_CART":
      new_state = Object.assign({}, state);
      new_state.addedItems = action.cartProducts;
      new_state.loaded = true;
      return new_state;
    case "SHOW_SUM":
      new_state = Object.assign({}, state);
      new_state.suma = action.suma;
      new_state.loaded = true;
      return new_state;
    case "ADD_PRODUCT":
      new_state = Object.assign({}, state);
      new_state.productsList.push(action.new_product);
      return new_state;
    case "EDIT_PRODUCT":
      new_state = Object.assign({}, state);
      new_state.productsList[action.updated_product.id] =
        action.updated_product.data;
      return new_state;
    case "REMOVE_PRODUCT":
      new_state = Object.assign({}, state);
      new_state.productsList.splice(action.removed_product.id, 1);
      return new_state;
    case "REMOVE_FROM_CART":
      new_state = Object.assign({}, state);
      let itemToRemove = state.addedItems.find(item => action.id === item.id);
      let new_items = state.addedItems.filter(item => action.id !== item.id);

      let nowa_suma = state.suma - itemToRemove.cena * itemToRemove.ilosc;
      new_state.addedItems = new_items;
      new_state.suma = nowa_suma;
      return new_state;
    case "UPDATE_ILOSC":
      /*new_state = Object.assign({}, state);
      let itemToUpdate = state.addedItems.find(
        item => item.id === action.updated.id
      );
      if (action.czyDodac === true) {
        new_state.addedItems.find(
          item => item.id === action.updated.id
        ).ilosc += 1;
        new_state.suma = state.suma + itemToUpdate.cena;
      } else {
        new_state.addedItems.find(
          item => item.id === action.updated.id
        ).ilosc -= 1;
        if (itemToUpdate.ilosc === 0) {
          new_state.addedItems.splice(
            new_state.addedItems.indexOf(itemToUpdate),
            1
          );
        }
        new_state.suma = state.suma - itemToUpdate.cena;
      }
      return new_state;*/
      let itemToUpdate = state.addedItems.find(item => item.id === action.id);
                  let nowaSuma = 0;
                  if(action.czyDodac === true){
                    itemToUpdate.ilosc += 1;
                    nowaSuma = state.suma + itemToUpdate.cena;
                  } else{ 
                    itemToUpdate.ilosc -= 1;
                    nowaSuma = state.suma - itemToUpdate.cena;
                    if(itemToUpdate.ilosc === 0) {
                        state.addedItems.splice(state.addedItems.indexOf(itemToUpdate),1);
                    }         
                  }
                   return{
                      ...state,
                      suma: nowaSuma
                    }

    case "ADD_ORDER":
      new_state = Object.assign({}, state);
      new_state.orders.push(action.newOrder);
      return new_state;

    default:
      return state;
  }
}
