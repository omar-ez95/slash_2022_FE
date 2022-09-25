import React, { useState, useEffect, useContext } from "react"
import { Context } from "../contexts/UserContext"
import axios from "axios"
import {
    useNavigate,
    useParams
} from "react-router-dom";
import {
    Form,
    Button,
    Modal,
    InputGroup,
    FormControl,
} from "react-bootstrap"
import loadable from '@loadable/component'

function DiscourceMsg() {
    const { setUser, isAuthenticated, setIsAuthenticated, setToken, token } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [msgs, setMsgs] = useState(null)
    const [message, setMessage] = useState(null)
    const { id } = useParams();
    const [discources, setDiscources] = useState([])

    useEffect(() => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            navigate("/login");
        }
        const fetch_msgs = async () => {
            // axios.defaults.withCredentials = true;
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            await axios
                .get(process.env.REACT_APP_URL + `msgs/${id}`,)
                .then((res) => {
                    setMsgs(res.data)
                    console.log(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                });
        };
        fetch_msgs()
    }, [])
    function addMessage() {
        const add = async () => {
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            const data = {
                "msg": message,
            }
            await axios
                .post(process.env.REACT_APP_URL + `msgs/post/${id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${token}`
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    setMsgs([res.data, ...msgs])

                    setMessage('')
                })
                .catch((err) => {
                });
        };
        add()
    }
    return (
        <>
            {loading ? <div>Loading..</div> :
                <>
                    <div className=" container discources">
                        <div className="discources-header pt-4" >
                            <Form>
                                {/*  descreption */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Message: </Form.Label>
                                    <InputGroup>
                                        {/* <InputGroup.Text>Descretion</InputGroup.Text> */}
                                        <FormControl onChange={(e) => {
                                            setMessage(e.target.value)
                                        }} type="text" value={message} placeholder="add a message" />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            <Button
                                variant=""
                                className="btn btn-primary"
                                onClick={() => addMessage()}
                            >
                                Save changes
                            </Button>
                        </div>
                        <div className="container white border">
                            <div className="add-button"></div>
                            {msgs.map(
                                (msg) => {
                                    return (
                                        <div className="msg">
                                            <h3>{msg.username} :</h3>
                                            <p>{msg.msg}</p>
                                            <hr />
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

export default DiscourceMsg;