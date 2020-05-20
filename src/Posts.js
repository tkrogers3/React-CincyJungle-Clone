
import React, { useState } from 'react';
import CommentModal from './CommentModal';
import { Link, useHistory } from "react-router-dom";
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Toast, ToastBody, ToastHeader
} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Jumbotron, } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NewPost from './NewPost.js';
import axios from 'axios';

function Posts(props) {
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

   
    function handleSubmit(e) {

        e.preventDefault();
        //console.log(localStorage.getItem('auth'));
        const auth = JSON.parse(localStorage.getItem('auth'))
        const config = {
            headers:{
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
        axios.post('http://localhost:8000/api/post/', postInfo, config)
            .then(function (response) {
                console.log("This is working, line 44");
                //console.log(response.data);
                history.push("/");
                // the post has been created
                // redirect the user to the posts page
            })
            .catch(function (error) {

                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error);

            });
            history.push("/");
    }

  
    function timerDifference(createdTime) {
        let currentTime = new Date().getTime();
        let difference = currentTime - createdTime;
        let days = Math.floor(difference / 86400000);
        let hours = Math.floor(difference / 3600000);     //milliseconds per hour
        let minutes = Math.floor(difference / 60000);      //milliseconds per minute    

        if (minutes < 1) {
            return " Just now";
        }
        if (minutes === 1) {
            return "1 minute ago";
        }
        if (minutes < 60) {
            return minutes + " minutes ago";
        }
        if (hours === 1) {
            return hours + " hour ago";
        }
        
                if (hours < 24) {
                    return hours + " hours ago";
                }
                if (days === 1) {
                    return days + " day ago"
                }
        if (days > 1) {
            return days + " days ago"
        }


    }


    const post = props.postsData.length ? props.postsData.filter(item => item.id === props.postPage)[0] : null;
    
    let postTime = new Date(post ? post.created_at : null);
    
    let history = useHistory();


    return (
        ///Display post, with comments if applicable, selected from landing.

        post ?
            <React.Fragment>

                <div>
                    <Jumbotron className="bg-dark">
                        <Card>
                            <CardHeader className="post-title">{post.title}

                            </CardHeader>
                            <CardBody>
                                <CardTitle><p> by <span className="orange">{post.user.username} </span>  {timerDifference(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p></CardTitle>
                                <CardText className="post-para">{post.body.replace(`/\n\g`, `<br />`)}</CardText>
                            </CardBody>

                            <CardFooter className="container m-1 text-start">
                                <div className="row">
                                    {post.comments.length === 1 ?
                                       <h5> There is {post.comments.length} comment. <a className ="orange"  href={toggleModal}>{buttonLabel}Add yours.</a></h5>:
                                        <h5> There are {post.comments.length} comments. <span className ="orange"   onClick={toggleModal}>{buttonLabel}Add yours.</span></h5> }
                                    <CommentModal
                                    toggle={toggle}
                                        modal={modal}
                                        toggleModal={toggleModal}
                                        closeBtn={closeBtn}
                                        post_id={props.postPage}
                                        parent_id={0}
                                    />

                                </div></CardFooter>
                        </Card>
                    </Jumbotron>
                </div>

                
                 {post.comments.length > 0 ?
                    <div className="container bg-yellow text-start">
                        {post.comments.map((comment, index) => {
                            return (

                                <div className="row border border-dark p-2" key={index}>
                                    <h5><span className="comment-title">{comment.title}</span></h5>

                                    <p>{comment.body}</p>
                                    <hr className="grey-hr"></hr>
                                    <p> by <span className="orange">{comment.user.username} </span>{timerDifference(new Date(comment.created_at))}</p>
                                </div>
                            )
                        })}
                    </div>
                    : null}


            </React.Fragment>


            :

            //////////////////////////Create a Post form//////////////////////////////////////////
            <NewPost />

            // <Form onSubmit={handleSubmit} >

            //     <FormGroup>
            //         <Label for="exampleName">Post Title</Label>
            //         <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} placeholder="Please enter a title." />
            //     </FormGroup>

            //   <hr></hr>
            //     <FormGroup>
            //         <Label for="exampleEmail">Post Body</Label>
            //         <Input onChange={(e) => setBody(e.target.value)} className="form-control" rows="3" type="textarea" name="body" value={body} placeholder="Please enter your post body." />
            //     </FormGroup>


            //     <Button className="btn-secondary custom-btn" type="submit" >Submit</Button>{' '}
            //     <Link to="/">
            //         <Button className="btn-secondary custom-btn">Cancel</Button>
            //     </Link>

            // </Form>



    )
}


export default Posts

