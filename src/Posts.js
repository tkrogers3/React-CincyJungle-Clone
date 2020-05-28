
import React, { useState, } from 'react';
import CommentModal from './CommentModal';
import { Link, useHistory } from "react-router-dom";
import {
   ButtonGroup, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Jumbotron, } from 'reactstrap';
import NewPost from './NewPost.js';
import axios from 'axios';

function Posts(props) {
    //  const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
    const API_ENDPOINT = "http://localhost:8000";
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
    const {
        buttonLabel
    } = props;
    const loginUser = JSON.parse(localStorage.getItem('auth'));

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
        axios.post(API_ENDPOINT + '/api/post', postInfo, config)
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

    const post = props.postsData.length ? props.postsData.find(item => item.id === props.postPage) : null;
    let postTime = new Date(post ? post.created_at : null);


    return (
        ///Display post, with comments if applicable, selected from landing.
        post ?

            <React.Fragment>
                <div>
                    <Jumbotron className="postBox">
                        <div className="container bg-white border border border-dark rounded">
                            <h1 className="display-3 post-title">{post.title}</h1>
                            <hr className="my-2" />
                            <p className="lead"> by <span className="orange">{post.user.username} </span>  {props.timeChange(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p>
                            <hr className="my-2" />
                            <p className="post-para">{post.body}</p>
                            <hr className="my-2" />
                            <div className="container m-1 text-start">
                                <div className="row">
                                    <h5>
                                        {post.comments.length === 1 ? `There is ${post.comments.length} comment.` : `There are ${post.comments.length} comments.`}
                                        {loginUser ? <span className="orange" id="modal" onClick={toggleModal} >Add yours</span> : "Please login or register to add yours!"}
                   
                                    </h5>
                                    {auth.user.id === post.user_id}
                                    <ButtonGroup className="edit">
      <Button className=" bg bg-success">Edit</Button>
      <Button className=" bg bg-danger">Delete</Button>
     </ButtonGroup>   :null;}
                                    <CommentModal
                                        toggle={toggle}
                                        modal={modal}
                                        toggleModal={toggleModal}
                                        closeBtn={closeBtn}
                                        post_id={props.postPage}
                                        parent_id={0}
                                    />
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                </div>

                {post.comments.length > 0 ?
        
        post.comments.map((comment, index) => {
            return (
                <Card className="pb-2 mb-2" key={index}>
                    <CardHeader className="comment-title">{comment.title}</CardHeader>
                    <CardBody>
                        <CardTitle> by<span className="orange">{comment.user.username}</span></CardTitle>
                        <CardText>{comment.body}</CardText>
                    </CardBody>
                    <CardFooter> by <span className="orange">{comment.user.username} </span>{props.timeChange(new Date(comment.created_at))}</CardFooter>
                </Card>
            )
        })
     : null}
            </React.Fragment >
            :
            //////////////////////////Create a Post form/////////////////////////////////////////          // <NewPost />
            <Form onSubmit={handleSubmit} >
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
export default Posts

