import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { AddShoppingCart } from "@material-ui/icons";
import useStyle from "./styles";
import ImageHelper from "../../helper/ImageHelper";
import { addedProductToCart } from "../../helper/cartHelper";

const Product = ({ product }) => {
  const classes = useStyle();

  const addToCart = () => {
    addedProductToCart(product, () => console.log("Added to the product"));
  };

  return (
    <Card className={classes.root}>
      <ImageHelper product={product} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={addToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
