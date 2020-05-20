import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
           <div>
               <footer className="footer navBackground mt-2">
                   <div className="row">
                   <div className="col-4 orange ">
                       <img src="/cincyjungle.png" width="150" height="120" alt=""></img>
                   </div>
                   <div className="col-4">
                  
                   <h5 className="footer m-5 h">  CincyJungle© </h5> 
                   </div>
                   <div className="col-4">
                  <a href="https://twitter.com/CincyJungle"> <FontAwesomeIcon className="black float-right m-4 p-1 " size="5x" icon={faTwitter} /></a>
                 
                  
                   </div>
                       </div>
               </footer>
           </div>
        )
    }
    