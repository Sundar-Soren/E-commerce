import React from "react";
import "./style.css";
import { Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import ManageCategory from "./admin/ManageCategory";
import Cart from "./core/cart/Cart";
import StripeCheckout from "./core/StripeCheckout";
import Products from "./core/products/Products";

const App = () => {
  return (
    <>
      <Route exact path="/" component={Products} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/buy" component={StripeCheckout} />
      <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
      <AdminRoute exact path="/admin/create/category" component={AddCategory} />
      <AdminRoute
        exact
        path="/admin/manage/category"
        component={ManageCategory}
      />
      <AdminRoute exact path="/admin/create/product" component={AddProduct} />
      <AdminRoute exact path="/admin/products" component={ManageProducts} />
      <AdminRoute
        exact
        path="/admin/product/update/:productId"
        component={UpdateProduct}
      />
    </>
  );
};

export default App;
