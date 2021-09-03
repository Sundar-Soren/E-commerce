import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper'
import Base from '../core/Base'


const Signin = () => {

    const [values, setValues] = useState({
        email: "a@gmail.com",
        password: "1234",
        error: "",
        loading: "",
        didRedirect: ""
    })

    const { email, password, error, loading, didRedirect } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }



    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values, didRedirect: true
                        })
                    })
                }
            })
            .catch(() => {
                console.log("fail to sign in");
            })
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }


    const loadingMessage = () => {
        return (
            loading && (
                <h1>Loading</h1>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }
    const signinForm = () => {
        return (<form>
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
                <label htmlFor="InputPassword">Password</label>
                <input type="password"
                    onChange={handleChange("password")}
                    value={password}
                    className="form-control"
                    id="InputPassword"
                    placeholder="Password" />
            </div>
            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>)
    }


    return (
        <Base title="SignIn Page" description="Create a New Account Here">

            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-8 offset-md-3">
                        {performRedirect()}
                        {loadingMessage()}
                        {errorMessage()}
                        {signinForm()}
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Signin
