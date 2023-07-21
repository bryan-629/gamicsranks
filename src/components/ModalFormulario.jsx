import React, { useEffect, useState } from 'react'
import { Modal,Button, Form } from 'react-bootstrap'
import { useAuthentication } from '../../Context/AuthProvider'
import useApi from '@/hooks/useApi';
function ModalFormulario() {
const { user,showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser,setShowIdModal } = useAuthentication();

const { data, isLoading, error, fetchData } = useApi();
const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error:  saveNewIDError, fetchData:saveNewID } = useApi();
const [userIdForm,setUserIdForm] = useState("");
const [show, setShow] = useState(false);// ESTADO DE LA MODAL
const [comprobeLoading, setComprobeLoading] = useState(false)
const [isOkIdClass, setIsOkIdClass] = useState()
const [disableSendButton, setDisableSendButton] = useState(true)

const handleClose = async () => {// CERRAR MODAL 
    await signOutUser()
    setShowIdModal(false);
}
useEffect(()=>{
    setIsOkIdClass('')
    setDisableSendButton(true)
},[userIdForm])

const handleComprobe = async () => {
    setDisableSendButton(true)
    if (userIdForm) {
        const regex = /^(?=.{4,})\S+$/i;
        if (regex.test(userIdForm)) {
            setComprobeLoading(true)
            await fetchData(process.env.NEXT_PUBLIC_API_URL +"comprobeUser.php?id=" + userIdForm.toUpperCase(), "GET").then((response)=>{
                setComprobeLoading(false)
                console.log(response.id == userIdForm.toUpperCase())
                if (response.id == userIdForm.toUpperCase()) { // es igual la respuesta a lo que el a escrito?
                    setIsOkIdClass('is-valid') //es igual, asi que ponemos el input en valido y le permitimos enviarlo 
                    setDisableSendButton(false)
                }else{
                    setIsOkIdClass('is-invalid')
                    setDisableSendButton(true)
                }
            })
        }else{
            setIsOkIdClass('is-invalid')
            setDisableSendButton(true)
        }
    }else{
        setIsOkIdClass('is-invalid')
        setDisableSendButton(true)
    }
}
 
const handleSubmit = async () =>{
    const sendData = {
        "id":userIdForm.toUpperCase(),
        "uid":user.uid
    }
    await saveNewID(process.env.NEXT_PUBLIC_API_URL +"saveNewIDs.php?id=" + userIdForm.toUpperCase(), "POST", sendData)
    
}


  return (
    <Modal show={showIdModal}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bienvenido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="">
                    <div className="mb-3">
                        <Form.Label>Introduce el id de usuario</Form.Label>
                        <div className='d-flex justify-content-between'>
                            <Form.Control className={`w-75 ${isOkIdClass}`} name='points' value={userIdForm} type="text" placeholder="Introduce tu id" onChange={(e)=>{setUserIdForm(e.target.value)}}/>
                            <Button className='' disabled={comprobeLoading} onClick={handleComprobe}>Comprobar</Button>
                        </div>
                    </div>
                    
                    <p className='mx-1'>Minimo 4 caracteres</p>
                </Form.Group>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={comprobeLoading} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={disableSendButton} onClick={() => {handleSubmit() 
            handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalFormulario