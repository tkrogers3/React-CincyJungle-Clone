import React from 'react';
import { Link } from "react-router-dom";
import { Jumbotron, Alert, Spinner } from 'reactstrap';

function Landing(props) {
    const setPostObj = (post) =>{
        
        // set local storage
        localStorage.setItem('postObj', JSON.stringify(post));
        console.log(post);
        props.setPostPage(post);
    }

    if (props.postsData == undefined) {
        return (<Jumbotron centered>
            <Alert className="alert" color="dark">
                <Spinner className="orange " />
                <h4>Loading</h4>
            </Alert>
        </Jumbotron>)
            ;
    } else {
        var postRow = props.postsData.length ? props.postsData.map((post, index) => {
            var postTime = new Date(post.created_at);

            return (

                <tr key={index}>
                    <td >
                        <span className="orange">
                            {<Link to="Post" className="orange a:hover" onClick={() => setPostObj(post)}>{post.title}</Link>}</span>
                        <br></br>
                        <em > Posted {props.timeChange(postTime)} by <span className="orange "> {post.user.username}</span></em>
                    </td>
                    <td >
                        {post.comments.length > 0 ?
                            <React.Fragment>
                                Posted {props.timeChange(new Date(post.comments[post.comments.length - 1].created_at))} by <span className="orange">{post.comments[post.comments.length - 1].user.username} </span>
                                <span className="m-comment-count__bubble">{post.comments.length}</span>
                            </React.Fragment>
                            : "No Comments"
                        }</td>
                </tr>
            )
        }) : null

        return (

            postRow ?
                <div className="table-responsive text-centered border border-dark">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-centered">Subject</th>
                                <th className="text-centered">Last Reply/Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postRow}
                        </tbody>
                    </table>
                </div> :


                <Jumbotron centered>
                    <Alert className="alert" color="dark">
                        <Spinner className="orange " />
                        <h4>Loading</h4>
                    </Alert>
                </Jumbotron>

        )
    }
}

  
export default Landing;
