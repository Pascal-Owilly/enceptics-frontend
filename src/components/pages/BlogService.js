import axios from "axios";

export function getPost(){
    return axios.get('http://127.0.0.1:8000/post/blog/')
    .then(response => response.data)
    }

export function deletePost(blog_id){
    return axios.delete('http://127.0.0.1:8000/post/blog/' + blog_id + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
}

export function addPost(post){
    return axios.post('http://127.0.0.1:8000/post/blog/', {
        blog_id:null,
        Body: post.Body.value
    })
    .then(response=>response.data)
}

export default function updatePost(blog_id, post) {
    axios.put('http://127.0.0.1:8000/post/blog/' + blog_id + '/', {
        Post: post.Body.value
    })
    .then(response => response.data)
}