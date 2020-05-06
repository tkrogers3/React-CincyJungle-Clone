import React from 'react'


export default function Navigation() {
  return (
 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <img src="/cincyjungle.png" width="200" height="160" alt=""></img>
      <a className="navbar-brand" >Cincy Jungle</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
         
      
        </ul>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            <a className="nav-link orange " href="#" tabindex="-1" aria-disabled="true">UserName /Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
