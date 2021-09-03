import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import AdminDashBoard from '../user/AdminDashBoard'
import { getAllCategories, getProduct, updateProduct } from './helper/adminapicall'




const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData } = values

    const preload = (productId) => {
        getProduct(productId).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                preloadCategories()
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                })
            }
        })
    }

    const preloadCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ categories: data, formData: new FormData() })
            }
        })
    }


    useEffect(() => {
        preload(match.params.productId)
    }, [])



    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }
    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })
        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name
                })
            }

        })
    }

    const loadingMessage = () => {
        if (loading) {
            return <h4 className="alert alert-primary">Loading...</h4>
        }
    }

    const successMessage = () => (
        <div className="alert alert-success" style={{ display: createdProduct ? "" : "none" }}>
            <h4>{createdProduct} Updated successfully</h4>
        </div>
    )



    const errorMessage = () => {
        if (error) {
            return <h4 className="alert alert-warning">{error}</h4>
        }
    }

    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && (
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        ))
                    )}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="stock"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
                Create Product
            </button>
        </form>
    );

    return (
        <AdminDashBoard>
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {createProductForm()}
        </AdminDashBoard>
    )
}

export default UpdateProduct
