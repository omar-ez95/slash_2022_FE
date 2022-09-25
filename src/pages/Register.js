import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { Context } from "../contexts/UserContext"

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const navigate = useNavigate()

    const { setUser, isAuthenticated, setIsAuthenticated, setToken, } = useContext(Context)


    // if the user in logged in he will be redirected to the main page
    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            navigate("/");
        }

    }, [isAuthenticated, navigate])

    const logIn = () => {
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);

        // axios.defaults.withCredentials = true;
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        console.log(process.env.REACT_APP_URL)
        console.log(process.env.REACT_APP_URL)

        axios
            .post(process.env.REACT_APP_URL + 'authy/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                let groups = []
                navigate('/login')
                props.history.push('/login');
            })
            .catch((err) => {

            });
    };


    const onSubmit = (e) => {
        e.preventDefault();
        logIn();

    }
    function goToRegister() {
        navigate("/register")
    }
    const LogInForm = (
        <div className="">
            <div className="login-page">
                <div className="authincation-content">
                    <div className="mb-4">
                        <h3 className="mb-1 font-w600">Welcome to slash 2022</h3>
                        <p className="">Register by entering information below</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="mb-2 ">
                                <strong className="font-color">User Name</strong>
                            </label>
                            <input type="text"
                                className="form-control "
                                name="userName"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mb-2 ">
                                <strong className="font-color">Email</strong>
                            </label>
                            <input type="text"
                                className="form-control "
                                name="userName"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="font-color"><strong className="font-color">Password</strong></label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Enter your Password"
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className=" google-icon btn btn-primary btn-block">Register</button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    )



    return (
        LogInForm
    )
}

export default Register;
