import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
           <div>
               <footer className="footer bg-dark">
                   <div className="row">
                   <div className="col-4 orange ">
                       <img src="/cincyjungle.png" width="200" height="160" alt=""></img>
                   </div>
                   <div className="col-4">
                   <h1 img src="https://cdn.vox-cdn.com/images/sbn/footer/vox_logo_white.v00c1a853720d5447355341dbb11d120851c86e6a.png"> ©Vox Media </h1>
                  
                   </div>
                   <div className="col-4">
                  <a href="https://twitter.com/CincyJungle"> <FontAwesomeIcon className="orange float-right m-4 p-1" width="200" height="160" icon={faTwitter} /></a> 
                   </div>
                       </div>
               </footer>
           </div>
        )
    }
    