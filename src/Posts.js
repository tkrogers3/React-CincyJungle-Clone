import React from 'react'

function Posts(props) {

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
    return (
        post ?
            <React.Fragment>
                <div className="Container  text-start">
                    <div className="Row border border-dark p-2">
                        <h1 className="post-title">{post.title}</h1>
                        <p> by <span className="orange">{post.user.username} </span> on {timerDifference(postTime)} <span className="m-comment-count__bubble">{post.comments.length}</span></p>
                        <hr></hr>
                        <p className="post-para"> {post.body}</p>
                    </div>
                </div>

                <div className="container m-1 text-start">
                    <div className="row">
                  {post.comments.length === 1 ?
                        <h5>  There is {post.comments.length} comment. <span className="orange">Add yours.</span></h5>:
                        <h5> There are {post.comments.length} comments. <span className="orange">Add yours.</span></h5> }
                    </div>
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
                    :  <h5> There are {post.comments.length} comments. <span className="orange">Add yours.</span></h5> }
            </React.Fragment>
            : null
    )
                    }


export default Posts