import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation.js';
import Fanposts from './Fanposts.js';
import Footer from './Footer.js';
import Landing from './Landing.js';
import Posts from './Posts.js';
import axios from 'axios';


function App() {
  const [postPage, setPostPage] = useState(0);
  const [postsData, setPostsData] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts/')
      .then(function (response) {
        console.log(response.data.data);
        setPostsData(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])
  //asdfasdf
  if (postsData) console.log(postsData);
  return (

    <Router>
      <div className="App">
        <div className="container">

          <Navigation />

          <Fanposts />
          <Route path="/" exact>
            <Landing
              postsData={postsData}
              setPostPage={setPostPage}
            />
          </Route>
          <Route path="/posts">
            <Posts
             postsData={postsData}
            postPage={postPage}
            />
          </Route>


          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
