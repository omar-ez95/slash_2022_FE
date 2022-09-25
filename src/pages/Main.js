import React, { useState, useEffect, useContext } from "react"
import { Context } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import loadable from '@loadable/component'
const Article = loadable(() => import('../components/Article'));

function Main() {
    const { setUser, isAuthenticated, setIsAuthenticated, setToken, } = useContext(Context)
    const navigate = useNavigate()
    const [articels, setArticels] = useState([])


    useEffect(() => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            navigate("/login");
        }

        const fetch_articles = async () => {
            // axios.defaults.withCredentials = true;
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            await axios
                .get(process.env.REACT_APP_URL + 'articles',)
                .then((res) => {
                    setArticels(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                });
        };
        fetch_articles()
    }, [])

    return (<>
        <div className="article-container container">
            {articels.map(
                (article) => {
                    return (
                        <Article article={article} />
                      
                    )
                }
            )}
        </div>
    </>);
}

export default Main;