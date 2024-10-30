import * as React from "react";

const Cart = (props) => {
  return (
    <div className="card w-50 m-4 pb-4">
      <h1 className="card-header">Shopping Cart</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
        {props.products.map((product) => {
          // Check if the product is in the cart
          if (props.inCartProducts[product.id] > 0) {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{props.inCartProducts[product.id]}</td>
                <td>{product.price}$</td>
              </tr>
            );
          }
          // If the product is not in the cart, return null
          return null;
        })}
      </tbody>
      </table>
      <span className="mx-auto">Total: {props.total}$</span>
    </div>
  );
};

export { Cart };
