import React, { useEffect, useState } from "react";
import {
  addedProductToCart,
  getAddedCartProduct,
  removeItemFromCart,
} from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeToCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [cartProduct, setCartProduct] = useState([]);

  const getAddAndRemoveButton = () => {
    //   if (product._id === cartProduct._id) {
    //     addToCart = false;
    //     removeToCart = true;
    //   } else {
    //     addToCart = true;
    //     removeToCart = false;
    //   }
  };

  useEffect(() => {
    setCartProduct(getAddedCartProduct());
    getAddAndRemoveButton();
  }, []);

  const addToCartMethode = () => {
    addedProductToCart(product, () => {
      console.log("product is added to the  cart");
    });
  };

  const removeToCartMethode = () => {
    removeItemFromCart(product._id);
    setReload(!reload);
  };

  return (
    <div className="card m-2" style={{ width: "18rem", height: "max-content" }}>
      <div>
        <ImageHelper product={product} />
      </div>
      {/* <div className="h-100"> */}
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">{product.description}</p>
      <h3>{product.price}$</h3>
      <div className="w-100">
        {addToCart && (
          <button
            onClick={addToCartMethode}
            className="btn btn-primary w-50 m-2"
          >
            Add To Cart
          </button>
        )}
        {removeToCart && (
          <button
            onClick={removeToCartMethode}
            className="btn btn-primary w-50 m-2"
          >
            Remove to Cart
          </button>
        )}

        <a href="#" className="btn btn-primary m-2">
          Buy Now
        </a>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Card;
