import React, { useEffect, useState } from "react";
import Base from "../Base";
import { getAddedCartProduct } from "../helper/cartHelper";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const getCartProduct = () =>
    products.map((product, index) => {
      return (
        <div className="col-lg-3 col-md-4 p-5" key={index}>
          <CartProduct product={product} setReload={setReload} />
        </div>
      );
    });

  useEffect(() => {
    setProducts(getAddedCartProduct());
  }, [reload]);
  return (
    <Base title="Cart Page" description="Ready to check Out">
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            getCartProduct()
          ) : (
            <h3>NO Products Available In The Cart </h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
