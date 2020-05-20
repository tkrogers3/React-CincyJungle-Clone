
const[]


<Modal isOpen={props.modal} toggle={props.toggleModal} centered>
<ModalHeader toggle={props.toggleModal} className=" mx-auto text-center" close={props.closeBtn}> {props.activeTab === 'register' ? 
<img src="/register.png"  className="img-fluid radius" width="250"  alt=""></img> : <img src="/whodey.jpg"  className="img-fluid radius" width="250"  alt=""></img> }
 </ModalHeader>
<ModalBody>
  <Form >

    <FormGroup>
      <Label for="exampleName">Post Title</Label>
      <Input onChange={(e) => setName(e.target.value)} type="name" name="name" value={name} id="exampleName" placeholder="Please enter your name." />
    </FormGroup> 


    <FormGroup>
      <Label for="exampleEmail">Post Body</Label>
      <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="exampleEmail" placeholder="Please enter your Email address" />
    </FormGroup>


  </Form>
</ModalBody>
<ModalFooter>
<Button className="btn-secondary custom-btn" onClick={}>Submit</Button>{' '}
  <Button className="btn-secondary custom-btn" onClick={props.toggleModal}>Cancel</Button>
</ModalFooter>
</Modal>
