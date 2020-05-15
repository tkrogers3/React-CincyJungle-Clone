import React from 'react'

function Posts(props) {
console.log(props.postsData);
console.log(props.postPage);
 const post = props.postsData.length ? props.postsData.filter(item => item.id == props.postPage)[0] : null;
console.log(post);

    if(post != null){
    return (
        <React.Fragment>
        <div className="Container  text-start">
        <div className="Row border border-dark p-2">
            <h1 className="post-title">{post.title}</h1>
            <p> by user.username on created_at</p>
            <hr></hr>
            <p className="post-para"> Now that the schedule is out, how many wins do you think the Bengals will have?

I guess it's a pretty weak schedule based on their finish last season, but they definitely play some good teams as well.

I'll go with six. I hope I'm wrong and they win more.</p>
        </div>
         
        </div>
        <div className="Container text-start">
            <div className="=Row">
                <h5>There are (number of comments) comments. Add yours.</h5>
            </div>
        </div>
        <div className="Container  bg-yellow text-start">
        <div className="Row border border-dark p-2">
            <h5><span className="comment-title">Comment Title</span></h5>
            <p>This is the comment body</p>
           <hr></hr>
            <p> by user.username on created_at</p>
            </div>
        </div>
       
        <div className="Container bg-yellow text-start">
        <div className="Row border border-dark p-2">
        <h5><span className="comment-title">Comment Title</span></h5>
            <p>This is the comment body</p>
            <br></br>
            <p> by user.username on created_at</p>
            </div>
        </div>
        </React.Fragment>
        ) 
    } else {
        return null
    }
}

export default Posts
