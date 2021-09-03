import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper'
import AdminDashBoard from '../user/AdminDashBoard'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {
    const [values, setValues] = useState({ name: "", error: "", success: false })
    const { token, user } = isAuthenticated()

    const { name, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setValues({ error: true })
                } else {
                    setValues({ name: "", error: "", success: true })
                }
            })
            .catch(err => console.log(err))
    }

    const errorMessage = () => {
        if (error) {
            return (
                <h5 className="text-danger">Failed to create Category</h5>
            )
        }
    }
    const successMessage = () => {
        if (success) {
            return (
                <h5 className="text-success"> Category created successfully</h5>
            )
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <input type="text"
                    onChange={handleChange("name")}
                    value={name}
                    className="form-control"
                    placeholder="Enter Category" />
            </div>
            <div className="pt-3">
                <button onClick={onSubmit} className="btn btn-primary">Add Category</button>

            </div>
        </form>
    );

    return (
        <AdminDashBoard>

            <div className="row m-4">
                <div className="col-lg-6 col-md-6 col-sm-8 col-6 " >
                    <h1>Add Category</h1>
                    {errorMessage()}
                    {successMessage()}
                    {myCategoryForm()}

                </div>
            </div>

        </AdminDashBoard>
    )
}

export default AddCategory
