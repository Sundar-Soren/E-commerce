import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import AdminDashBoard from '../user/AdminDashBoard'
import { deleteCategory, getAllCategories } from './helper/adminapicall'

const ManageCategory = () => {

    const { user, token } = isAuthenticated()

    const [categories, setCategories] = useState([])

    const preloadAllCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            console.log(data);
            setCategories(data)
        })
    }


    const deleteThisCategory = (categoryId) => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                preloadAllCategories()

            }
        })
    }


    useEffect(() => {
        preloadAllCategories()
    }, [])


    const displayAllCategories = () => (
        <div className="container">
            <div className="row ">
                <div className="d-flex flex-wrap">
                    {categories.map((category, index) => (
                        <div key={index} className="d-flex flex-column m-2 p-1 border border-dark w-25">
                            <div>{category.name}</div>
                            <Link className="m-1">edit</Link>
                            <button onClick={() => { deleteThisCategory(category._id) }} className="btn m-1 btn-danger"> delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    return (
        <AdminDashBoard>

            {displayAllCategories()}

        </AdminDashBoard>
    )
}

export default ManageCategory
