import React from 'react';
import './App.css';
import Navbar from './Navigation.js';
import Fanposts from './Fanposts.js';
import Footer from './Footer.js';
import Posts from './Posts.js';

function App() {
  return (
   

      <div className="App">
      <div className="container">

        <Navbar />
        <Fanposts />
        <Posts />
        <Footer />
      </div>
 </div>
 
  );
}

export default App;
