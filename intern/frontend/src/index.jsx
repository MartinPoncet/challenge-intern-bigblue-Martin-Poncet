import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cart } from "./components/Cart/Cart";
import { Shop } from "./components/Shop/Shop";

const App = () => {
  const [products, setProducts] = React.useState([]);

  // availableProducts is an object that looks like
  // { ['product 1 name']: number of products 1 available,
  //   ['product 2 name']: number of products 2 available,
  //    ....
  //  }
  const [availableProducts, setAvailableProducts] = React.useState({});

  // inCartProducts is an object that looks like
  // { ['product 1 name']: number of products 1 in cart,
  //   ['product 2 name']: number of products 2 in cart,
  //    ....
  //  }
  // A product item is either available or in cart so that
  // product.stock = availableProducts[product.id] + inCartProducts[product.id]
  const [inCartProducts, setInCartProducts] = React.useState({});

  // Fetch products from the backend
  // and store them in the products state.
  React.useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.products);

        // Initialize availableProducts and cartProducts
        const initialAvailableProducts = products.products.reduce(
          (acc, curr) => {
            return { ...acc, [curr.id]: curr.stock };
          },
          {}
        );
        const initialInCartProducts = products.products.reduce((acc, curr) => {
          return { ...acc, [curr.id]: 0 };
        }, {});

        setAvailableProducts(initialAvailableProducts);
        setInCartProducts(initialInCartProducts);
      });
  }, []);

  // Add a product to cart.
  // Updating corresponding quantities in availableProducts and inCartProducts
  const onAddToCart = (productId) => {
    const availableBeforeAdd = availableProducts[productId];

    if(availableBeforeAdd>0){
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeAdd - 1,
    });
    const inCartBeforeAdd = inCartProducts[productId];
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeAdd + 1,
    });
  }
  };

  const onRemoveFromCart = (productId) => {
    const availableBeforeRemove = availableProducts[productId];
    const inCartBeforeRemove = inCartProducts[productId];
    
    if(inCartBeforeRemove>0){
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeRemove + 1,
    });
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeRemove - 1,
    });
  }
  };


  // What is displayed.
  // Display the Shop component and the Cart component.

  // Calculate the total price of the products in the cart.
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const quantityInCart = inCartProducts[product.id];
    total += product.price * quantityInCart;
  }

  return (
    <div className="d-flex justify-content-between">
      <Shop
        products={products}
        availableProducts={availableProducts}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
      <Cart products={products} inCartProducts={inCartProducts} total={total}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));