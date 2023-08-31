import React from "react";
import { Modal, Col, Row, Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { addPost } from "./BlogService";

const AddPostModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        }, 
        (error)=>{
            alert("Failed to add post")
        }
        )
    }

    return(
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labellebly="contined-modall-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title" vcenter>
                            Add Post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Control type="text" required placeholder="say something ...">Add post</Form.Control>
                                        <Button variant="primary" type="submit">Submit</Button>
                                         </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dangr" type="submit" onClick={props.onHide}>
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )

}

export default AddPostModal;