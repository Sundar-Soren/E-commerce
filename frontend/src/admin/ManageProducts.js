import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import AdminDashBoard from '../user/AdminDashBoard'
import { deleteProduct, getProducts } from './helper/adminapicall'

const ManageProducts = () => {

    const [products, setProducts] = useState([])
    const { user, token } = isAuthenticated()

    const getAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setProducts(data)

            }
        })
    }

    const deleteTheProduct = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                getAllProducts()
            }
        })
    }


    useEffect(() => {
        getAllProducts()
    }, [])


    const displayAllProducts = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex flex-wrap">
                    {products.map((product, index) => (
                        <div key={index} className="col-md-6">
                            <div>Photo</div>
                            <div>{product.name}</div>
                            <Link className="btn btn-primary" to={`/admin/product/update/${product._id}`}>Update</Link>
                            <button onClick={() => { deleteTheProduct(product._id) }} className="btn btn-danger">Delete</button>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <AdminDashBoard>
            <h4>Manage Product</h4>
            {displayAllProducts()}
        </AdminDashBoard>
    )
}

export default ManageProducts
