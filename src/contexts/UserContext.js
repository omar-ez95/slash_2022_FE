import React, { useState, useEffect } from "react"
// import useAxiosPrivate from "../customHooks/useAxiosPrivate";
import axios from "axios"
const Context = React.createContext()

function UserContext({ children }) {
    // const axiosPrivate = useAxiosPrivate();

    const [token, setToken] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({
        email: '',
        id: 0,
        username: '',
        groups: [],
        profile: {}
    })

    useEffect(() => {
        // delete axios.defaults.headers.common["Authorization"];
        // localStorage.clear()
        // console.log('localstorage_toek',localStorage.access_token)
        // console.log('localstorage_userData',localStorage.userData)
        let userData = null
        let access_token = null
        if (localStorage.userData) {
            userData = JSON.parse(localStorage.userData_slash)
            if (localStorage.access_token_slash) {
                access_token = JSON.parse(localStorage.access_token)
                setToken(access_token)
                if (userData) {
                    console.log('######################')
                    console.log('userData', userData)
                    setIsAuthenticated(true)
                    setUser(userData)
                }
            }

        }
        else {
            setIsAuthenticated(false)
        }

    }, [])
    return (
        <Context.Provider value={{
            token,
            setToken,
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,

        }}>
            {children}
        </Context.Provider>
    )
}

export { UserContext, Context }