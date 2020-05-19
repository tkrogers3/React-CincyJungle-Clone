
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Media
} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Jumbotron, toggleModal } from 'reactstrap';
import axios from 'axios';
function Posts(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');



    //handleSubmit for Create a new post.
    //Datatable posts - user id/title/body
    function handleSubmit(e) {

        e.preventDefault();
        console.log(localStorage.getItem('auth'));
        // the user has submitted the form
        // I need to get the title and body from state CHECK
        // I need to get the user's id that is in localStorage 
        // I need to pass the form data and user data to the axios post to create the new Post in Laravel
        const auth= JSON.parse(localStorage.getItem('auth'))

        const postInfo = {
            // key: value,

              // Denis assisted with this.
            // const config = {
            //     headers:{
            //     'content-type' : 'multipart/form-data',
            //     'authorization': 'Bearer ' + auth.token
            // }
            user_id: auth.user.id,
            title: title,
            body: body,
            headers: {
                // key: value
                // this provides authentication so that the route can be called
                authorization: 'Bearer ' + auth.token

            },
        }
        // route, data
        console.log(postInfo);
        axios.post('http://localhost:8000/api/post/', postInfo)
            .then(function (response) {
                console.log("This is working, line 44");
                console.log(response.data);
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




        console.log(title);
        console.log(body);
    }

    function timerDifference(createdTime) {
        let currentTime = new Date().getTime();
        let difference = currentTime - createdTime;




        /* Hours/Minutes/Seconds rounded down to even number to divide time difference by  
        milliseconds*/
        let days = Math.floor(difference / 86400000);
        let hours = Math.floor(difference / 3600000);     //milliseconds per hour
        let minutes = Math.floor(difference / 60000);      //milliseconds per minute    


        //console.log({days,hours,minutes})
        if (days > 1) {
            return days + " days ago"
        }
        if (days === 1) {
            return days + " day ago"
        }
        if (minutes < 60) {
            return minutes + " minutes ago";
        }

        if (hours < 24) {
            return hours + " hours ago";
        }
    }

    const post = props.postsData.length ? props.postsData.filter(item => item.id === props.postPage)[0] : null;



    let postTime = new Date(post ? post.created_at : null);

    let history = useHistory();
  

    return (



        ///Display post selected from landing.

        post ?
            <React.Fragment>

<div>
      <Jumbotron className="bg-dark">
      <Card>
                    <CardHeader className="post-title">{post.title}

                    </CardHeader>
                    <CardBody>
                        <CardTitle><p> by <span className="orange">{post.user.username} </span>  {timerDifference(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p></CardTitle>
                        <CardText className="post-para">{post.body}</CardText>
                    </CardBody>
                    <CardFooter className="container m-1 text-start">
                        <div className="row">
                            {post.comments.length === 1 ?
                                <h5> There is {post.comments.length} comment. <span className="orange"><a href="/posts"> Add yours.</a></span></h5> :
                                <h5> There are {post.comments.length} comments. <span className="orange">Add yours.</span></h5>}
                        </div></CardFooter>
                </Card>
      </Jumbotron>
    </div>
 
                <Card>
                    <CardHeader className="post-title">{post.title}

                    </CardHeader>
                    <CardBody>
                        <CardTitle><p> by <span className="orange">{post.user.username} </span>  {timerDifference(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p></CardTitle>
                        <CardText className="post-para">{post.body}</CardText>
                    </CardBody>
                    <CardFooter className="container m-1 text-start">
                        <div className="row">
                            {post.comments.length === 1 ?
                                <h5> There is {post.comments.length} comment. <span className="orange"><a href="/posts"> Add yours.</a></span></h5> :
                                <h5> There are {post.comments.length} comments. <span className="orange">Add yours.</span></h5>}
                        </div></CardFooter>
                </Card>



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
                    : <h5> There are {post.comments.length} comments. <span className="orange">Add yours.</span></h5>}


            </React.Fragment>


            :

            //////////////////////////Create a Post form//////////////////////////////////////////

            <Form onSubmit={handleSubmit} >

                <FormGroup>
                    <Label for="exampleName">Post Title</Label>
                    <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} placeholder="Please enter a title." />
                </FormGroup>


                <FormGroup>
                    <Label for="exampleEmail">Post Body</Label>
                    <Input onChange={(e) => setBody(e.target.value)} type="text" name="body" value={body} placeholder="Please enter your post body.  " />
                </FormGroup>


                <Button className="btn-secondary custom-btn"  type="submit" >Submit</Button>{' '}
                <Link to="/">
                    <Button className="btn-secondary custom-btn">Cancel</Button>
                </Link>

            </Form>



    )
}


export default Posts