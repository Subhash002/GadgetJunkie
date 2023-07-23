export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
export const updateCart = (state) => {
  // Calculate Item Price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping Price (Assuming the shipping price is 0 when itemsPrice > 100)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax Price
  state.taxPrice = addDecimal(Number(state.itemsPrice * 0.15).toFixed(2));

  // Calculate total Price (Fix the calculation here)
  state.totalPrice = addDecimal(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  );

  localStorage.setItem("cart", JSON.stringify(state.cartItems));
  return state;
};
