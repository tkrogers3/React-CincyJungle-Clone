import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation.js';
import Fanposts from './Fanposts.js';
import Footer from './Footer.js';
import Landing from './Landing.js';
import Post from './Post.js';
import CreatePost from './CreatePost'
import axios from 'axios';


function App() {

     // const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
const API_ENDPOINT = "http://localhost:8000";
  const [postPage, setPostPage] = useState(0);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINT+'/api/posts/')
      .then(function (response) {
        console.log(response.data.data);
        setPostsData(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])


  let timeChange = function timerDifference(createdTime) {
    let currentTime = new Date().getTime();
    let difference = currentTime - createdTime;
    let days = Math.floor(difference / 86400000);
    let hours = Math.floor(difference / 3600000);     //milliseconds per hour
    let minutes = Math.floor(difference / 60000);      //milliseconds per minute    

    if (minutes < 1) {
      return " Just now";
    }
    if (minutes === 1) {
      return "1 minute ago";
    }
    if (minutes < 60) {
      return minutes + " minutes ago";
    }
    if (hours === 1) {
      return hours + " hour ago";
    }
    if (hours < 24) {
      return hours + " hours ago";
    }
    if (days === 1) {
      return days + " day ago"
    }
    if (days > 1) {
      return days + " days ago"
    }
  };

  if (postsData) //console.log(postsData);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Navigation 

            />
            <Fanposts />
            <Route path="/" exact>
              <Landing
                postsData={postsData}
                setPostPage={setPostPage}
                timeChange={timeChange}
              />
            </Route>
          <Route path="/post">
              <Post
                postsData={postsData}
                setPostsData={ setPostsData}
                postPage={postPage}
                setPostPage={setPostPage}
                timeChange={timeChange}
              />
             
            </Route>
            <Route path="/createpost">
              <CreatePost 
                setPostsData={ setPostsData}
                postsData={postsData}
                postPage={postPage}
                setPostPage={setPostPage}
              />
            </Route>
            <Footer />
          </div>
        </div>
      </Router>
    );
}

export default App;
