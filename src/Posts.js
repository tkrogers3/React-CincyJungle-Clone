import React from 'react';
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

        var postCol = this.state.posts.map((item, index) => {
            <tbody>
                <tr>
                    <td>{item.title}</td>
                    <hr></hr>
                    <td>{item.body}</td>
                </tr>
            </tbody>
               
        });
}

        return (
            <div>
                <div class="container MB ">
               
            <table> 
                <thead>
                    <tr>
                        <th> Subject </th>
                        <th> Comments </th>
                        <th> Last Reply </th>
                    </tr>
                </thead>
               {postCol}
            </table>
                    </div>
                </div>
         
        )
    }

export default Posts