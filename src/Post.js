
import React, { useState, } from 'react';
import CommentModal from './CommentModal';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ButtonGroup, Card, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';
import { Button, Jumbotron, } from 'reactstrap';
import Landing from './Landing.js';
function Post(props) {
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
    const loginUser = JSON.parse(localStorage.getItem('auth'));
    const userId = loginUser ? loginUser.user.id : null;
    let post = props.postPage;
    if(post.id == undefined){
        const result = localStorage.getItem('postObj');
        post = JSON.parse(result);
        
        // get the post from local 
        // if no post in localstorage
        // go to the home page
         if(result == null){
           history.push("/");

        }
        
    }

    let postTime = new Date(post ? post.created_at : null);
 

    //const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
    const API_ENDPOINT = "http://localhost:8000";


    function deletePost(post_id) {
        const auth = JSON.parse(localStorage.getItem('auth'))


        const config = {
            headers: {
                'Authorization': 'Bearer ' + auth.token,
                'Accept': 'application/json',

            },
            // 

        };
        const postInfo = {
        
            id:post_id
        }

        axios.post(API_ENDPOINT + '/api/deletePost', postInfo, config)
            .then(function (response) {
                //delete postPage id
                //delete post from postsData array
                // the post has been deleted
                // redirect the user to the posts page
                console.log(response)
                props.setPostsData(response.data.posts)
                history.push("/");

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
    return (
        ///Display post, with comments if applicable, selected from landing.
       
           post ?
            <React.Fragment>
                <div>
                     <Jumbotron className="postBox">
                        <div className="container bg-white border border border-dark rounded">
                            <h3 className=" post-title">{post.title}</h3>
                            <hr className="my-2" />
                            <p className="lead"> by <span className="orange">{post.user.username} </span>  {props.timeChange(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p>
                            <hr className="my-2" />
                            <p className="post-para">{post.body}</p>
                            <hr className="my-2" />
                            <div className="container m-1 text-start">
                                <div className="row">
                                    <div className="col">
                                        <h5>
                                            {post.comments.length === 1 ? `There is ${post.comments.length} comment.` : `There are ${post.comments.length} comments.`}
                                            {loginUser ? <span className="orange" id="modal" onClick={toggleModal} >Add yours</span> : "Please login or register to add yours!"}
                                        </h5>
                                    </div>
                                    <div className="col text-right">
                                        {post.user_id === userId ?
                                   
                                               
                                                <Button className=" bg bg-danger" onClick={() => deletePost(post.id)} >Delete</Button>

                                            : null}
                                    </div>
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

                                    <CardText>{comment.body}</CardText>
                                </CardBody>
                                <CardFooter> by <span className="orange">{comment.user.username} </span>{props.timeChange(new Date(comment.created_at))}</CardFooter>
                            </Card>
                        )
                    })
                    : null} 
            </React.Fragment >
            : null
    )
}
export default Post

