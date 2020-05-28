

import React, { useState, } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';


import axios from 'axios';

function CreatePost(props) {
    //  const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
    const API_ENDPOINT = "http://localhost:8000";
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
    const loginUser = JSON.parse(localStorage.getItem('auth'));
console.log(loginUser);
   

    let history = useHistory();
    
    function handleSubmit(e) {

        e.preventDefault();
        const auth = JSON.parse(localStorage.getItem('auth'))
        const config = {
            headers: {
                'Authorization': 'Bearer ' + auth.token,
                'Accept': 'application/json',
            }
        };

       
        const postInfo = {
            'user_id': auth.user.id,
            'title': title,
            'body': body,
        }
        console.log(postInfo);
        axios.post(API_ENDPOINT + '/api/createpost', postInfo, config)
            .then(function (response) {
                console.log("This is working, line 44");
                console.log(response.data);
                props.setPostPage(response.data.posts.id);
                props.setPostsData(response.data.posts)
                history.push("/");
                // the post has been created
                // redirect the user to the posts page
            })
            .catch(function (error) {

                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {

                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });

    } 
    
   
   return(
<Form onSubmit={handleSubmit}>
<FormGroup>
    <Label for="exampleName">Subject</Label>
    <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} placeholder="Please enter a title." />
</FormGroup>
<hr></hr>
<FormGroup>
    <Label for="exampleEmail">Body</Label>
    <Input onChange={(e) => setBody(e.target.value)} className="form-control" rows="3" type="textarea" name="body" value={body} placeholder="Please enter your post." />
</FormGroup>

<Button className="btn-secondary custom-btn" type="submit" >Submit</Button>{' '}

<Link to="/">
    <Button className="btn-secondary custom-btn">Cancel</Button>
</Link>
</Form>
)
}
export default CreatePost;