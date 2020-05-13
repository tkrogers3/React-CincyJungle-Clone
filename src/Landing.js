import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []

        }
    }

    async componentDidMount() {

        let result = await axios.get('http://localhost:8000/api/posts/')
            .then(function (response) {
                console.log(response);
                return response.data.data// handle success
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        console.log(result, '!!!Result!!!!');
        this.setState({
            posts: result
        })
    }
    render() {

        var postRow = this.state.posts.length ? this.state.posts.map((post, index) => {
            return (

                <tr key={index}>
                    <td >
                        <span className="orange ">{post.title}</span>
                        <br></br>
                        <em > {post.comments[post.comments.length -1].title} <span className="orange "> {post.user.username}</span></em>
                        </td>
                  
                    <td > {post.comments[post.comments.length -1].created_at} by <span className="orange">{post.user.username}</span>
                    <br></br>
            
                    <span><FontAwesomeIcon className="orange" icon={faCommentAlt}/>  0</span></td>
                </tr>
            )
        }) : null;

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