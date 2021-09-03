import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { Link } from 'react-router-dom'


const AdminDashBoard = ({ children }) => {

    const { user: { name, email, role } } = isAuthenticated()

    const adminLeftSide = () => {
        return (
            <div>
                <h1>Admin Navigation</h1>
                <div class="list-group">
                    <Link to="/admin/create/category" class="list-group-item"> Create Category</Link>
                    <Link to="/admin/manage/category" class="list-group-item"> Manage Category</Link>
                    <Link to="/admin/create/product" class="list-group-item">Create Product</Link>
                    <Link to="/admin/products" class="list-group-item">Manage Product</Link>
                    <Link to="/admin/order" class="list-group-item">Manage Order</Link>
                </div>

            </div>


        )
    }



    return (
        <Base title="Admin Dash Board" description={`Welcome ${name} to Admin Dashboard`} >
            <div className="container">
                <div className="row">
                    <div className="col col-lg-4 col-md-4 col-sm-10 col-10 ">

                        {adminLeftSide()}

                    </div>
                    <div className="col gx-lg-4 gx-md-4 mt-4">
                        {children}

                    </div>


                </div>
            </div>

        </Base>
    )
}

export default AdminDashBoard
