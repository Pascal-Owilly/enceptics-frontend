import React, { Component } from 'react';
import { Modal, Col, Row, Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import updatePost, { addPost } from "./BlogService";

const UpdatePostModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        updatePost(props.post.blog_id, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true)
            }, (error) => {
                alert('Failed to update post');
            })   
        }

        
        return(
            <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelleby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title" vcenter>
                            Update post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                            
                                            <Form.Control type='text' defaultValue={props.post.Body} placeholder='' />
                                        
                                        <Form.Control type="text" required placeholder="Update post">Update post</Form.Control>
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
    export default UpdatePostModal;