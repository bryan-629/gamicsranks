import React,{useState} from 'react'
import { Modal,Button, Form } from 'react-bootstrap'

function AddMatchMPModal({show,setShow,storeOrUpdateGameInDatabase,user,initialForm,setForm,form}) {
    
    
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
                        <Form.Label>Result</Form.Label>
                        <Form.Select name='result' value={form.result} onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}>
                            <option value="Win">Win</option>
                            <option value="Lose">Lose</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mode</Form.Label>
                        <Form.Select name='mode' value={form.mode} onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}>
                            <option value="Hard point">Hard point</option>
                            <option value="Control">Control</option>
                            <option value="SND">SND</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Map</Form.Label>
                        <Form.Select name='map' value={form.map} onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}>
                            <option value="Al Bagra Fortress">Al Bagra Fortress</option>
                            <option value="El Asilo">El Asilo</option>
                            <option value="Expo">Expo</option>
                            <option value="Hydro">Hydro</option>
                            <option value="Breenbergh Hotel">Breenbergh Hotel</option>
                            <option value="Embassy">Embassy</option>
                            <option value="Mercado">Mercado</option>
                        </Form.Select>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Points</Form.Label>
                        <Form.Control name='points' value={form.points} type="number" placeholder="Enter points" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Kills</Form.Label>
                        <Form.Control name='kills' value={form.kills} type="number" placeholder="Enter kills" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Deaths</Form.Label>
                        <Form.Control name='deaths' value={form.deaths} type="number" placeholder="Enter deaths" onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}}/>
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

export default AddMatchMPModal