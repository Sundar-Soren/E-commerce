import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { RemoveShoppingCart, ShopTwo } from "@material-ui/icons";
import useStyle from "./Style-cart";
import ImageHelper from "../helper/ImageHelper";
import { removeItemFromCart } from "../helper/cartHelper";

const CartProduct = ({ product }) => {
  const classes = useStyle();

  const removeFromCart = () => {
    removeItemFromCart(product._id);
  };
  const purchaseTheProduct = () => {
    //
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
        <div className={classes.IconStyle}>
          <IconButton title="Buy" onClick={purchaseTheProduct}>
            <ShopTwo />
          </IconButton>
          <IconButton title="Remove from Cart" onClick={removeFromCart}>
            <RemoveShoppingCart />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartProduct;
