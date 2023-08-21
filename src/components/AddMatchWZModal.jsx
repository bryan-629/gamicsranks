import React,{useState} from 'react'
import { Modal,Button, Form } from 'react-bootstrap'

function AddMatchWZModal({show,setShow,storeOrUpdateGameInDatabase,user,initialForm,setForm,form}) {
    
    
      //Funcion para cuando se cierra el modal
  const handleCloseModal = () => {// CERRAR MODAL
    setForm(initialForm) 
    setShow(false);
  }


  return (
    <Modal show={show}  onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>ADD NEW MATCH</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Position</Form.Label>
                        <Form.Control name='position' value={form.position} type="number" placeholder="Enter Position" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Kills</Form.Label>
                        <Form.Control name='kills' value={form.kills} type="number" placeholder="Enter kills" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Sr after match</Form.Label>
                        <Form.Control name='srTotal' value={form.srTotal} type="number" placeholder="Enter sr after match" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {storeOrUpdateGameInDatabase(form) 
                handleCloseModal()}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
  )
}

export default AddMatchWZModal