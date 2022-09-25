
import React, { useState, useEffect, useContext } from "react";

import {
    Form,
    Button,
    Modal,
    InputGroup,
    FormControl,
} from "react-bootstrap"
import axios from "axios";
import {
    useNavigate,
    useParams
} from "react-router-dom";
// CONTEXT
import { Context } from "../contexts/UserContext"

function AddDisclouserModal({ setAddDisclouserModal, AddDisclouserModal, article }) {
    // CONTEXTS
    const { token } = useContext(Context)
    console.log(token)
    console.log(token)
    console.log(token)
    console.log(token)
    const history = useNavigate();
    // FORM
    const [question, setQuestion] = useState('');
    // const [categoryType, setCategoryType] = useState('');
    const [productsType, setProductsType] = useState('food');
    const [description, setDescription] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        return function () {
        }
    }, [])
    function addDiscluser(){
        const add = async () => {
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            const data = {
                "name": question,
                "describtion": description,
            }
            await axios
                .post(process.env.REACT_APP_URL + `discource/post/${article}`,data, {
                    headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Token ${token}`
                    }
                  })
                .then((res) => {
                    console.log(res.data)
                    navigate(`/discource/${res.data.id}`)
                })
                .catch((err) => {
                });
        };
        add()
    }
    return (
        <>
            <Modal
                className="fade bd-example-modal-lg"
                show={AddDisclouserModal}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Add Disclosure</Modal.Title>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => setAddDisclouserModal(false)}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/*  descreption */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Question: </Form.Label>
                            <InputGroup>
                                {/* <InputGroup.Text>Descretion</InputGroup.Text> */}
                                <FormControl onChange={(e) => {
                                    setQuestion(e.target.value)
                                }}  type="text" value={question}/>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <Form>
                        {/*  descreption */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descretion: </Form.Label>
                            <InputGroup>
                                {/* <InputGroup.Text>Descretion</InputGroup.Text> */}
                                <FormControl onChange={(e) => {
                                    setDescription(e.target.value)
                                }} calue={description} as="textarea" aria-label="With textarea" />
                            </InputGroup>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger light"
                        onClick={() => setAddDisclouserModal(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant=""
                        className="btn btn-primary"
                        onClick={() => addDiscluser()}
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )



}

export default AddDisclouserModal;
