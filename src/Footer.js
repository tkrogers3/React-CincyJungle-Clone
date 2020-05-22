import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
           <div>
               <footer className="footer navBackground mt-2">
                   <div className="row">
                   <div className="col-4 orange ">
                   <a href="https://twitter.com/CincyJungle"> <FontAwesomeIcon className="black m-4 p-1" size="4x" icon={faTwitter}/></a>
                   </div>
                   <div className="col-4">
                   <h3 className="mt-3 px-auto" >Follow us on social media!</h3></div>
                   <div className="col-4">
                  <a href="https://facebook.com/CincyJungle"> <FontAwesomeIcon className="black  m-4 p-1"  size="4x" icon={faFacebook}/></a>
                 
                  
                   </div>
                       </div>
               </footer>
           </div>
        )
    }
    