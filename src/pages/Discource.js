import React, { useState, useEffect, useContext } from "react"
import { Context } from "../contexts/UserContext"
import axios from "axios"
import {
    useNavigate,
    useParams
} from "react-router-dom";
import loadable from '@loadable/component'
const Article = loadable(() => import('../components/Article'));

function ArticleDetails() {
    const { setUser, isAuthenticated, setIsAuthenticated, setToken, } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const { articleId } = useParams();
    const [discources, setDiscources] = useState([])
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
                .get(process.env.REACT_APP_URL + `article/${articleId}`,)
                .then((res) => {
                    setArticle(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                });
        };
        fetch_articles()
    }, [])

    useEffect(() => {
        const fetch_discources = async () => {
            // axios.defaults.withCredentials = true;
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            await axios
                .get(process.env.REACT_APP_URL + `discources/${articleId}`,)
                .then((res) => {
                    setDiscources(res.data)
                    console.log(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                });
        };
        if (article) {
            fetch_discources()
        }
    }, [article])

    return (
        <>
            {loading ? <div>Loading..</div> :
                <>
                    <div className="discources">
                        <div className="discources-header" >
                            <img src={article.img} className="" alt="" />
                            <div className="details">
                                <h2 className="text-align-left">{article.name}</h2>
                                <p className="text-align-left">{article.describtion}</p>
                            </div>
                        </div>
                        <div className="container mt-5 pt-5">
                            <div className="add-button"></div>
                            {discources.map(
                                (discource) => {
                                    return (
                                        <div className="discource">
                                            <h3>{discource.user} :</h3>
                                            <p>{discource.name}</p>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </>
            }

        </>
    );
}

export default ArticleDetails;