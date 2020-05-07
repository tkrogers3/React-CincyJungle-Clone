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

        var postRow = this.state.posts.length ? this.state.posts.map((item, index) => {
            return (

                <tr key={index}>
                    <td >
                        <span className="orange ">{item.title}</span>
                        <br></br>
                        <em > 10 minutes ago by <span className="orange "> {item.user.username}</span></em>
                        </td>
                  
                    <td > 20 minutes ago by <span className="orange">{item.user.username}</span>
                    <br></br>
                    <span><FontAwesomeIcon className="orange" icon={faCommentAlt}/>  0</span></td>
                </tr>
            )
        }) : null;

        return (

            <div className="table-responsive">
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
export default Posts