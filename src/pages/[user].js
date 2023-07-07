import { useState,useEffect } from 'react'
import Table from '@/components/Table'
import { Modal,Button, Form } from 'react-bootstrap'
import '../firebase'
import { collection, addDoc, getDocs, deleteDoc,doc, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';

function user(props) {
    const initialForm = {
        username:props.user.toUpperCase(),
        date_time: '',
        result:'Win',
        mode:'Hard point',
        map:'Al Bagra Fortress',
        points:'',
        kills:'',
        deaths:'',
        sr:'',
        srTotal:''
    }
    const [matches,setMatches] = useState([])
    const [form, setForm] = useState(initialForm)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
        getData()
    },[])

    const handleClickDelete = async (e) =>{
        e.preventDefault;
        const idClicked = e.target.parentElement.parentElement.id;
        await deleteDoc(doc(db, "matches", idClicked));
        const resultado = matches.filter(match => match.id != idClicked)
        setMatches(resultado);
        getData()
    }
    const getData = async () => {
        const matchesRef = collection(db,'matches')
        const matchesQuery = query(matchesRef, orderBy("date_time","desc"));
        const querySnapshot = await getDocs(matchesQuery);
        let matchesCopia = []
        querySnapshot.docs.forEach((doc) => { //los tados y el id de la partida vienen por separado, entonces se lo añadimos manualmente
            let resultado = doc.data();
            resultado.id = doc.id
            matchesCopia.push(resultado)
        });
        setMatches(matchesCopia)
    }
    const setMatchFB = async () =>{
        form.date_time = new Date()
        if (matches[0]) { //si exite la partida anterior hacemos la resta para saber cuantos puntos a ganado o perdido
            form.sr = form.srTotal - matches[0].srTotal
            if(form.sr > 0){
                form.sr = '+' + form.sr // añadimos el signo positivo
            }
        }else{
            form.sr = form.srTotal
        }
       await addDoc(collection(db,"matches"),form)
       getData()
       setForm(initialForm);
       console.log('nueva partida guardada');
    }

  return (
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
                    {matches[0]?(<Table matches={matches} handleClickDelete={handleClickDelete}></Table>):("vacio")}
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
          <Button variant="primary" onClick={() => {setMatchFB() 
            handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default user


export async function getServerSideProps({query}) {
    
   const data = await fetch("http://localhost:3000/api/hello").then((res)=>{
    if (!res.ok) {
        throw new Error("Response is NOT ok");
    } else {
        return res.json();
    }
   }).catch((error) =>{
    return error;
   })
    return {
      props: {
        user:query.user,
        data:data
    }
  }
}
