import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";



class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],

        }
    }


    timerDifference(createdTime) {

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



    render() {

        var postRow = this.props.postsData.length ? this.props.postsData.map((post, index) => {

            var postTime = new Date(post.created_at);
            console.log(post.comments);
            console.log(post)
            // const latestComment = post.comments ? post.comments[post.comments.length - 1]: null
      
            return (

                <tr key={index}>
                    <td >
                        <span className="orange">
                        {<Link to ="Posts" onClick={()=> props.setPostsPage(post.id)}>{post.title}</Link>}</span>
                        <br></br>
                        <em > {this.timerDifference(postTime)} by <span className="orange "> {post.user.username}</span></em>
                    </td>
                    <td >
                        {post.comments.length > 0 ?
                            <React.Fragment>
                                {this.timerDifference(new Date(post.comments[post.comments.length - 1].created_at))} by <span className="orange">{post.comments[post.comments.length - 1].user.username} </span>
                                <span className="m-comment-count__bubble">{post.comments.length}</span>
                            </React.Fragment>
                            : "No Comments"
                        }</td>

                </tr>
            )
        }) : null

        return (

            <div className="table-responsive border border-dark">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Subject</th>

                            <th>Last Reply/Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postRow}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Posts;

