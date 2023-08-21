import { useState,useEffect,useContext } from 'react'
import Table from '@/components/Table'
import { Modal,Button, Form } from 'react-bootstrap'
import '../firebase'
import CustomNavbar from '@/components/CustomNavbar'
import useApi from '@/hooks/useApi';
import { useAuthentication } from '../../Context/AuthProvider';
import useCookie from '@/hooks/useCookie';
import { useRouter } from 'next/router';
import AlertError from './AlertError'
import LineChart from '@/components/LineChart';
import Image from 'next/image'
import Spinner from 'react-bootstrap/Spinner';
import GameSelectorBar from '@/components/GameSelectorBar'
import AddMatchMPModal from '@/components/AddMatchMPModal'


function MpPage({props}) { //Perfil del usuario donde se muestran  todas las estadisticas
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      if ( !isLoadingAuth && userStats) {
        setIsLoading(false)
      }

    },[user,userStats])
  

    //Use Effect para cuando se renderiza por primera vez.
    useEffect(()=>{ 
        getData(); 
    },[])

    //Use Effect para cuando haya algun cambio en las partidas
    useEffect(()=>{ 
      
        if (userStats) {
            if (userStats.status == 404 ) {
              route.push("/404")
            }else{
              if (userStats.data?.datosGenerales) {
                setFechaArray(getFechaArray(userStats.data.datosDeCadaDia));
                setSrPorPartida(getSrPorPartidaArray(userStats.data.datosDeCadaDia));
                setKdArray(getKdArray(userStats.data.datosDeCadaDia));
                setMuertesTotales(getMuertesTotalesArray(userStats.data.datosDeCadaDia));
                setPorcentajeVictoriasArray(getPorcentajeVictoriasArray(userStats.data.datosDeCadaDia));
                setKillsTotalesArray(getKillsTotalesArray(userStats.data.datosDeCadaDia));
              }
              
            }

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
    setForm(initialForm) 
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
    const handleEdit = async (e) =>{
      e.preventDefault;
      const idClicked = e.target.parentElement.parentElement.id
      userStats.data.matches.filter((match)=>{
        if (match.id == idClicked) {
          handleOpenModal()
          setForm(match)
        }
      })
      
      
  }

    const getData = async () => {
        await getUserStats(process.env.NEXT_PUBLIC_API_URL + `userStats.php?user=${props.user.toUpperCase()}&mode=mw`, "GET")

    }

    const showButtonNewMatch = () =>{ //control para mostrar el boton de añadir nueva partida
        if (!isUserStatsLoading && !isLoadingAuth) {
            if (userStats && user) {
                if (user.id == props.user.toUpperCase()) {
                    return true
                }else{
                    return false
                }
               }
        }
    }
    
    const storeOrUpdateGameInDatabase = async (e) =>{

      if (form.id) {
        await insertDataRequest(process.env.NEXT_PUBLIC_API_URL +"updateMatch.php", "POST", form);
        
      }else{
        await insertDataRequest(process.env.NEXT_PUBLIC_API_URL +"insertMatch.php", "POST", form);
      }
        getData()
    }


    if (!isLoading) {
      return(
        <>
    
        
        <div className='min-vh-100 bg-dark text-white d-flex justify-content-center containter-fluid py-4'>
          <div className='container '>
          

            
            <div className=''>
              <div className='mb-2 d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                  {userStats.data?.userInfo?(<Image src={userStats.data.userInfo.photo_url}
                    alt="UserName profile image"
                    className=' align-content-center rounded-circle mb-3 flex-row'
                    width={60}
                    height={60}
                    >
                    </Image>):(null)}
                  <h1 className='text-uppercase mx-3 font-bebas'>{props.user}</h1>
                </div>
                <div className='d-flex align-items-center'>
                  {showButtonNewMatch() ? (<Button variant="primary btn-sm"  onClick={handleOpenModal}>ADD NEW MATCH</Button>):(null)}
                </div> 
              </div>
              <div className='mb-2'>
                  <h6 className='text-uppercase text-muted-dark font-bebas'> User Stats</h6>
              </div>
              <div className='container-fluid'>
                 <div className='d-flex justify-content-between row mb-4'>
                        {userStats.data?.datosGenerales?
                        (
                            <>
                            <div className='col-md-4 col-sm-12 p-0 pe-md-2'>
                              <div className='bg-card p-3 rounded'>
                                <h5 className='text-muted-dark mb-0 mx-1 font-bebas text-uppercase'>Kills deaths ratio</h5>
                                  <h1 className={`px-1 font-bebas`}>{userStats.data.datosGenerales.kd_promedio}</h1>
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
                                <h5 className='text-muted-dark mb-0 font-bebas text-uppercase mx-1'>SR</h5>
                                <h1 className={`px-1 font-bebas ${userStats.data.datosGenerales.sr_ganados_perdidos > 0? ("text-success"):("text-danger")}`}>{userStats.data.datosGenerales.sr_ganados_perdidos > 0 ? ("+"+userStats.data.datosGenerales.sr_ganados_perdidos):(userStats.data.datosGenerales.sr_ganados_perdidos)} </h1>
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
                                <h5 className='text-muted-dark mb-0 font-bebas text-uppercase mx-1'>Wins%</h5>
                                <h1 className=' px-1  font-bebas'>{userStats.data.datosGenerales.porcentaje_victorias + "%" }</h1>
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
                
                <div className='mb-2'>
                    <h6 className='text-uppercase text-muted-dark font-bebas'>Last matches</h6>
                </div>
                
                <div className='d-flex justify-content-center w-100'>
                    <div className='w-100'>
                      {userStats.data?.matches? 
                      (<Table matches={userStats.data.matches} handleClickDelete={handleClickDelete} handleEdit={handleEdit}></Table>)
                      :
                      (null)}
                            
                    </div>
                </div>
            </div>
            <AddMatchMPModal
            show={show}
            setShow={setShow}
            storeOrUpdateGameInDatabase={storeOrUpdateGameInDatabase}
            user={user}
            initialForm={initialForm}
            setForm={setForm}
            form={form}
          />
          {userStats || insertError || deleteMatchError?(
            <div className='fixed-top mt-5 d-flex justify-content-center flex-column align-items-center'>
              <AlertError errorState={userStatsError}>Error al recuperar las estadisticas</AlertError>
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
    }else{
      //Esta cargando la pagina...
      return(
        <>
          <div className='min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center containter-fluid px-5 py-4'>
            <Spinner animation="grow" variant="secondary" />
          </div>
        </>
      )
    }
}

export default MpPage

