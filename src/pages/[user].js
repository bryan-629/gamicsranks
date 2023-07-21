import { useState,useEffect,useContext } from 'react'
import Table from '@/components/Table'
import { Modal,Button, Form } from 'react-bootstrap'
import '../firebase'
import { collection, addDoc, getDocs, deleteDoc,doc, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import Navbar from '@/components/Navbar';
import useApi from '@/hooks/useApi';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import useCookie from '@/hooks/useCookie';

function user(props) {
    
    
    const initialForm = {
        username:props.user.toUpperCase(),
        result:'Win',
        mode:'Hard point',
        map:'Al Bagra Fortress',
        points:'',
        kills:'',
        deaths:'',
        srTotal:'',
        userID:''
    }
    const auth = getAuth();
    const [user, isLoadingLoginUser]= useAuthState(auth)
    const { cookies, setCookie, getCookie, deleteCookie } = useCookie();
    const { data: insertData, isLoading: isInserting, error: insertError, fetchData: insertDataRequest } = useApi();
    const { data: userData, isLoading: isLoadingUserData, error: userDataError, fetchData: getUserData } = useApi();
    const { data: deleteMatchInfo, isLoading: isLoadingDeleteMatch, error: deleteMatchError, fetchData: deleteMatch } = useApi();


    const [matches,setMatches] = useState([])
    const [form, setForm] = useState(initialForm)
    const [show, setShow] = useState(false);// ESTADO DE LA MODAL

  const handleClose = () => {// CERRAR MODAL 
    setForm({ ...form, userID: '' });// si cierra el formulario, reseateamos el valor a por defecto, por si luego hay cambios de usuario.
    setShow(false);
  }

  const handleShow = () => { //ABRIR MODAL
    setForm({ ...form, userID: user.uid }); //Si abre el formulario, preparamos ya el usuario que lo esta abriendo.
    setShow(true);
  }

    useEffect(()=>{
        if (!isLoadingLoginUser) {
            getData();
            console.log(user)
            //setCookie("accessToken",user.stsTokenManager.accessToken,user.stsTokenManager.expirationTime)
        };
    },[isLoadingLoginUser])

    const handleClickDelete = async (e) =>{
        e.preventDefault;
        await deleteMatch(process.env.NEXT_PUBLIC_API_URL + "deleteMatch.php", "POST", {"matchID" : e.target.parentElement.parentElement.id});
        getData()
    }

    const getData = async () => {
        await getUserData(process.env.NEXT_PUBLIC_API_URL + "userProfile.php", "POST", {"userID" : props.user.toUpperCase()});
    }
    
    const storeGameInDatabase = async (e) =>{
        await insertDataRequest(process.env.NEXT_PUBLIC_API_URL +"insertMatch.php", "POST", form);
        getData()
    }

  return (
    <>
    <Navbar></Navbar>
    <div className='min-vh-100 bg-dark text-white d-flex justify-content-center containter p-5'>
        
        <div className='container-fluid'>
            <div>
                <h1 className='text-uppercase'>{props.user}</h1>
            </div>
            <div className='d-flex justify-content-center '>
                <h1 className='text-uppercase'>historial</h1>
            </div>
            <div className='d-flex justify-content-center py-3'>
                <Button variant="primary" onClick={handleShow}>ADD NEW MATCH</Button>
            </div>
            <div className='d-flex justify-content-center container-fluid px-5'>
                <div className='container-fluid px-5'>
                    {isLoadingUserData?
                    (
                    <h1>Loading...</h1>
                    ):(
                        userData?(
                            <Table matches={userData} handleClickDelete={handleClickDelete}></Table>
                            ):(
                                <h1>Vacio...</h1>
                            )
                        )}
                </div>
            </div>
        </div>
        <Modal show={show}  onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {storeGameInDatabase() 
            handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    </>
    
  )
}

export default user


export async function getServerSideProps({query}) {
    
    return {
      props: {
        user:query.user,
    }
  }
}
