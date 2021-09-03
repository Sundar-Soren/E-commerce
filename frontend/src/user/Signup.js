import React, { useState } from 'react'
import { signup } from '../auth/helper'
import Base from '../core/Base'

const Signup = () => {

    const [values, setValues] = useState({ name: '', email: '', password: '', error: '', success: false })
    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("i reach here");
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                console.log(data)
                if (data.errors) {
                    setValues({ ...values, error: data.errors, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
            .catch(() => console.log("Error in sign In"))

    }

    const successMessage = () => {
        return (
            <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
                New Account in created Successfully
            </div>
        )
    }


    const errorMessage = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }


    const signupForm = () => {
        return (<form >
            <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input type="text"
                    onChange={handleChange("name")}
                    value={name}
                    className="form-control"
                    id="userName"
                    placeholder="Your Name" />
            </div>
            <div className="form-group">
                <label htmlFor="InputEmail1">Email address</label>
                <input type="email"
                    onChange={handleChange("email")}
                    value={email}
                    className="form-control"
                    id="InputEmail1"
                    placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword1">Password</label>
                <input type="password"
                    onChange={handleChange("password")}
                    value={password}
                    className="form-control"
                    id="InputPassword1"
                    placeholder="Password" />
            </div>

            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>)
    }



    return (
        <Base title="SignUp Page" description="Create a New Account Here">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-8 offset-md-3">
                        {errorMessage()}
                        {successMessage()}
                        {signupForm()}
                    </div>
                </div>
            </div>
        </Base>
    )
}


export default Signup
