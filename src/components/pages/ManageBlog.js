import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar  } from "react-bootstrap";
import { FaEdit, faEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getPost, deletePost } from "./BlogService";
import AddPostModal from './AddPostModal';
import UpdatePostModal from './UpdatePostModal';

const ManageBlog = () => {
    const [post, setPost] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editPost, setEditPost] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        let mounted = true;
        if (post.length && !isUpdated){
            return;
        }
        getPost()
        .then(data => {
            if(mounted){
                setPost(data);
            }
        })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, post])

    // Add handlers

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }

    const handleUpdate = (e, p) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditPost(p);
    };

    const handleDelete = (e, blog_id) => {
        if(window.confirm('Are you sure you want to delete this post?')){
            e.preventDefault();
            deletePost(blog_id)
            .then((result) => {
                alert(result);
                setIsUpdated(true)
            },
            (error) => {
                alert('Failed to delete post');
            })
        }
    }

    let AddModalClose = () => setAddModalShow(false);

    let editModalClose = () => setEditModalShow(false);

    return(
        <div className="container-fluid" style={{height:'100vh'}}>

            <div className="row">
                <p className="mt-5" id="manage"></p>
                <Table striped bordered hover className="react-bootstrap-table" id='dataTable'>
                    <thead>
                        <tr>
                            <th>Posted By </th>
                            <th>Date posted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {post.map((p) =>
                        <tr key={p.blog_id}>
                            
                            <td> {p.body}<span></span> {p.date_posted}
                            <span></span><hr />
                            <Button className="mr-2 btn-danger btn btn-sm" onClick={event => handleDelete(event, p.blog_id)}><RiDeleteBin5Line /></Button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <Button className="mr-2 danger btn btn-sm" onClick={event => handleUpdate(event, p)}><FaEdit /></Button>
                           </td>
                            <td>

                            {/* <UpdatePostModal show={editPost} post = {setIsUpdated} setUpdated={setIsUpdated} onHide = {editModalClose} >
                            </UpdatePostModal>  */}
                            </td>
                         </tr>
                        )} 
                    </tbody>
                    </Table>

                    <ButtonToolbar onClick={handleAdd}> 
                    <Button value='' >
                    Post something ...
                    </Button> 
                    <AddPostModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModalClose} ></AddPostModal>
                 </ButtonToolbar>
            </div> 
        </div>
    )

}
    

export default ManageBlog;