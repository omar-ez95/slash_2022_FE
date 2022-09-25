import React, { useState, useEffect, useContext } from "react"
import { Context } from "../contexts/UserContext"
import axios from "axios"
import {
    useNavigate,
    useParams
} from "react-router-dom";
import loadable from '@loadable/component'
const AddDisclouserModal = loadable(() => import('../components/AddDisclouserModal'));
const Article = loadable(() => import('../components/Article'));

function ArticleDetails() {
    const { setUser, isAuthenticated, setIsAuthenticated, setToken, } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const { articleId } = useParams();
    const [discources, setDiscources] = useState([])
    const [showModal, setShowModal] = useState(false)

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

    function gotToDisc(id){
        navigate(`/discource/${id}`)
    }
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
                        <div className="container mt-0 pt-0">
                            <div className="add-button">
                                <p  onClick={() => { setShowModal(true) }}>Add a discluser</p>
                            </div>

                            {discources.map(
                                (discource) => {
                                    return (
                                        <div className="discource" onClick={() => { gotToDisc(discource.id) }}>
                                            <h5>{discource.username} :</h5>
                                            <h3>{discource.name}</h3>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <AddDisclouserModal article={article.id} AddDisclouserModal={showModal} setAddDisclouserModal={setShowModal} />
                </>
            }

        </>
    );
}

export default ArticleDetails;