import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label,Input} from 'reactstrap';
import axios from 'axios';

const CommentModal = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    
    function handleSubmit(e) {
      console.log(e);
      e.preventDefault();
      const auth = JSON.parse(localStorage.getItem('auth'))
      const config = {
          headers:{
              'Authorization': 'Bearer ' + auth.token,
              'Accept': 'application/json',
          }
      };

      let parent_id = 0; // default
      if(props.parent_id != 0){
        parent_id = props.parent_id;
      }

      const commentInfo = {
        // The comment needs to know who its parent post is. 
        // The post id is given at creation of post in the database.
        // so the post id is available when the comment is created. 
        // How do I give that post_id to the comment?
        
          'parent_id': parent_id,
          'post_id':props.post_id,
          'user_id': auth.user.id,
          'title': title,
          'body': body,
      }
 console.log(commentInfo);

    
      axios.post('http://localhost:8000/api/comment/', commentInfo, config)
          .then(function (response) {
              console.log("This is comment data from line 31");
              console.log(response.data);
           
              props.toggleModal();
            
          })
          .catch(function (error) {

              if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else if (error.request) {
                  console.log(error.request);
              } else {
                  console.log('Error', error.message);
              }console.log(error);
          });
       
  }
 
  return (

  
     <Modal isOpen={props.modal} toggle={props.toggleModal} centered>
        <Form onSubmit={handleSubmit} >
      <ModalHeader toggle={props.toggleModal} className=" mx-auto text-center" close={props.closeBtn}> <img src="/comments.jpg"  className="img-fluid radius" width="250"  alt=""></img> 
      <br></br>
      Comments
       </ModalHeader>
      <ModalBody>
          <FormGroup>
            <Label>Subject</Label>
            <Input onChange={(e) => setTitle(e.target.value)} type="text"  value={title} placeholder="Please enter a title."></Input>
          </FormGroup> 


          <FormGroup>
            <Label>Message</Label>
            
            <Input onChange={(e) => setBody(e.target.value)} type="textarea" value={body} placeholder="Please enter a comment."></Input>

          </FormGroup>

      </ModalBody>
      <ModalFooter>
      <Button className="btn-secondary custom-btn" onClick={"/"} type="submit">Submit</Button>{' '}
        <Button className="btn-secondary custom-btn" onClick={props.toggleModal}>Cancel</Button>
      </ModalFooter>
             </Form>
    </Modal>
)}
export default CommentModal;