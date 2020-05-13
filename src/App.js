import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation.js';
import Fanposts from './Fanposts.js';
import Footer from './Footer.js';
import Landing from './Landing.js';
import Posts from './Posts.js';



function App() {
  return (

    <Router>
      <div className="App">
        <div className="container">

          <Navigation />

          <Fanposts />
          <Route path="/" exact component={Landing} />
          <Route path="/posts" component={Posts} />

        
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
