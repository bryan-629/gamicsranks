import { useState,useEffect,useContext } from 'react'
import Table from '@/components/Table'
import { Modal,Button, Form } from 'react-bootstrap'
import '../firebase'
import Navbar from '@/components/Navbar';
import useApi from '@/hooks/useApi';
import { useAuthentication } from '../../Context/AuthProvider';
import useCookie from '@/hooks/useCookie';
import { useRouter } from 'next/router';
import AlertError from '../components/AlertError'
import LineChart from '@/components/LineChart';

function user(props) { //Perfil del usuario donde se muestran  todas las estadisticas
    
    const route = useRouter()
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
    const {  user ,showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal,changeId  } = useAuthentication();
    const { cookies, setCookie, getCookie, deleteCookie } = useCookie();
    const { data: insertData, isLoading: isInserting, error: insertError, fetchData: insertDataRequest } = useApi();
    const { data: userStats, isLoading: isUserStatsLoading, error: userStatsError, fetchData: getUserStats } = useApi();
    const { data: matches, isLoading: isLoadingMatches, error: matchesError, fetchData: getMatches } = useApi();
    const { data: deleteMatchInfo, isLoading: isLoadingDeleteMatch, error: deleteMatchError, fetchData: deleteMatch } = useApi();
    const [showAddButton, setShowAddButton] = new useState(false)
    const [form, setForm] = useState(initialForm)
    const [show, setShow] = useState(false);// ESTADO DE LA MODAL
    const [fechaArray, setFechaArray] = useState(false);
    const [srPorPartidaArray, setSrPorPartida] = useState(false);
    const [kdArray, setKdArray] = useState(false);
    const [muertesTotalesArray, setMuertesTotales] = useState(false);
    const [porcentajeVictoriasArray, setPorcentajeVictoriasArray] = useState(false);
    const [killsTotalesArray, setKillsTotalesArray] = useState(false);

    //Use Effect para cuando se renderiza por primera vez.
    useEffect(()=>{ 
        getData();
        //setCookie("accessToken",user.stsTokenManager.accessToken,user.stsTokenManager.expirationTime)
    },[])

    //Use Effect para cuando haya algun cambio en las partidas
    useEffect(()=>{ 
        if (userStats) {
            setFechaArray(getFechaArray(userStats.datosDeCadaDia));
            setSrPorPartida(getSrPorPartidaArray(userStats.datosDeCadaDia));
            setKdArray(getKdArray(userStats.datosDeCadaDia));
            setMuertesTotales(getMuertesTotalesArray(userStats.datosDeCadaDia));
            setPorcentajeVictoriasArray(getPorcentajeVictoriasArray(userStats.datosDeCadaDia));
            setKillsTotalesArray(getKillsTotalesArray(userStats.datosDeCadaDia));
        }
    },[userStats])
    
    

    // Función para obtener un array con las fechas
function getFechaArray(data) {
    const fechaArray = data.map(item => item.fecha);
    return fechaArray;
  }
  
    // Función para obtener un array con los SR por partida
  function getSrPorPartidaArray(data) {
    const srPorPartidaArray = data.map(item => item.puntos_ganados_perdidos);
    return srPorPartidaArray;
  }
  
    // Función para obtener un array con los KD
  function getKdArray(data) {
    const kdArray = data.map(item => item.kd_promedio);
    return kdArray;
  }
  
    // Función para obtener un array con las muertes totales
  function getMuertesTotalesArray(data) {
    const muertesTotalesArray = data.map(item => item.muertes_totales);
    return muertesTotalesArray;
  }
  
    // Función para obtener un array con el porcentaje de victorias
  function getPorcentajeVictoriasArray(data) {
    const porcentajeVictoriasArray = data.map(item => item.porcentaje_victorias);
    return porcentajeVictoriasArray;
  }
    // Función para obtener un array con las kills totales
  function getKillsTotalesArray(data) {
    const porcentajeVictoriasArray = data.map(item => item.kills_totales);
    return porcentajeVictoriasArray;
  }
  //Funcion para cuando se cierra el modal
  const handleCloseModal = () => {// CERRAR MODAL 
    setForm({ ...form, userID: '' });// si cierra el formulario, reseateamos el valor a por defecto, por si luego hay cambios de usuario.
    setShow(false);
  }

  //Funcion para cuando se abre el modal.
  const handleOpenModal = () => { //ABRIR MODAL
    setForm({ ...form, userID: user.id }); //Si abre el formulario, preparamos ya el usuario que lo esta abriendo.
    setShow(true);
  }

    

    const handleClickDelete = async (e) =>{
        e.preventDefault;
        await deleteMatch(process.env.NEXT_PUBLIC_API_URL + "deleteMatch.php", "POST", {"matchID" : e.target.parentElement.parentElement.id});
        getData()
    }


    const getData = async () => {
        await getMatches(process.env.NEXT_PUBLIC_API_URL + `getLastMatches.php?user=${props.user.toUpperCase()}`, "GET")
        await getUserStats(process.env.NEXT_PUBLIC_API_URL + `userStats.php?user=${props.user.toUpperCase()}`, "GET")

    }

    const showButtonNewMatch = () =>{ //control para mostrar el boton de añadir nueva partida
        if (!isLoadingMatches && !isLoadingAuth) {
            if (matches && user) {
                if (user.id == props.user.toUpperCase()) {
                    return true
                }else{
                    return false
                }
               }
        }
    }
    
    const storeGameInDatabase = async (e) =>{
        await insertDataRequest(process.env.NEXT_PUBLIC_API_URL +"insertMatch.php", "POST", form);
        getData()
    }

  return (
    <>
    <Navbar></Navbar>
    <div className='min-vh-100 bg-dark text-white d-flex justify-content-center containter-fluid px-5 py-4'>
      <div className='container '>
      
      
        
        <div className=''>
          <div className='mb-3 d-flex flex-row justify-content-between'>
              <h3 className='text-uppercase'>{props.user}</h3>
              {showButtonNewMatch() ? (<Button variant="primary btn-sm"  onClick={handleOpenModal}>ADD NEW MATCH</Button>):(null)}
          </div>
          <div className='container-fluid'>
             <div className='d-flex justify-content-between row mb-4'>
                    {userStats != null?
                    (
                        <>
                        <div className='col-md-4 col-sm-12 p-0 pe-md-2'>
                          <div className='bg-card p-3 rounded'>
                            <p className='text-muted-dark mb-0 font-roboto text-uppercase'>Kills deaths ratio</p>
                              <h1 className={`px-1 font-bebas`}>{userStats.datosGenerales.kd_promedio}</h1>
                              <LineChart 
                                killsTotalesArray={killsTotalesArray} 
                                muertesTotalesArray={muertesTotalesArray} 
                                fechaArray={fechaArray} 
                                srPorPartidaArray={null} 
                                porcentajeVictoriasArray={null} 
                                kdArray={kdArray}>
                              </LineChart>
                          </div>
                        </div>

                        <div className='col-md-4 p-0 col-sm-12 px-md-1 h-100'>
                          <div className='bg-card p-3 rounded h-100'>
                            <p className='text-muted-dark mb-0 font-roboto text-uppercase'>SR</p>
                            <h1 className={`px-1 font-bebas ${userStats.datosGenerales.sr_ganados_perdidos > 0? ("text-success"):("text-danger")}`}>{userStats.datosGenerales.sr_ganados_perdidos > 0 ? ("+"+userStats.datosGenerales.sr_ganados_perdidos):(userStats.datosGenerales.sr_ganados_perdidos)} </h1>
                            <LineChart 
                              killsTotalesArray={null} 
                              muertesTotalesArray={null} 
                              fechaArray={fechaArray}
                              srPorPartidaArray={srPorPartidaArray} 
                              porcentajeVictoriasArray={null} 
                              kdArray={null}>
                            </LineChart>
                          </div>
                        </div>
                        <div className='col-md-4 p-0 col-sm-12 ps-md-2'>
                          <div className='bg-card p-3 rounded'>
                            <p className='text-muted-dark mb-0 font-roboto text-uppercase'>Wins%</p>
                            <h1 className=' px-1  font-bebas'>{userStats.datosGenerales.porcentaje_victorias + "%" }</h1>
                            <LineChart 
                              killsTotalesArray={null} 
                              muertesTotalesArray={null} 
                              fechaArray={fechaArray} 
                              porcentajeVictoriasArray={porcentajeVictoriasArray} 
                              kdArray={null}>
                            </LineChart>
                          </div>
                        </div>
                        </>
                    ):
                    (
                        null
                    )
                    }
            </div>
          </div>
            
            <div className='mb-3'>
                <h5 className='text-uppercase'>Last matches</h5>
            </div>
            
            <div className='d-flex justify-content-center w-100'>
                <div className='w-100'>
                    {isLoadingMatches || isLoadingAuth?
                    (
                    <h1>Loading...</h1>
                    ):(
                        matches?(
                            <Table matches={matches} handleClickDelete={handleClickDelete}></Table>
                            ):(
                                <h1>Vacio...</h1>
                            )
                        )}
                </div>
            </div>
        </div>
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
          <Button variant="primary" onClick={() => {storeGameInDatabase() 
            handleCloseModal()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {matchesError || insertError || deleteMatchError?(
        <div className='fixed-top mt-5 d-flex justify-content-center flex-column align-items-center'>
          <AlertError errorState={matchesError}>Error al recuperar las estadisticas</AlertError>
          <AlertError errorState={insertError}>Error al guardar la partida</AlertError>
          <AlertError errorState={deleteMatchError}>Error al borrar la partida</AlertError>
        </div>
      ):(
        null
        )}
     </div>
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
