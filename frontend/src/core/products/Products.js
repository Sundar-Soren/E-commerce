import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Product from "./product/Product";
import { getProduct } from "../helper/coreapicalls";
import Base from "../Base";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllproducts = () => {
    getProduct().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllproducts();
  }, []);

  return (
    <Base>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Base>
  );
};

export default Products;
