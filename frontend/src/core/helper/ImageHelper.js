import { CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import API from "../../backend";

const useStyle = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const ImageHelper = ({ product }) => {
  const classes = useStyle();
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://source.unsplash.com/user/erondu/1600x900";

  return (
    <div>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={product.name}
      />
    </div>
  );
};

export default ImageHelper;
