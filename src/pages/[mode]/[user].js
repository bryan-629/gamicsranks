import { useState,useEffect,useContext } from 'react'
import Table from '@/components/Table'
import { Modal,Button, Form } from 'react-bootstrap'
import '../../firebase'
import CustomNavbar from '@/components/CustomNavbar'
import useApi from '@/hooks/useApi';
import { useAuthentication } from '../../../Context/AuthProvider';
import useCookie from '@/hooks/useCookie';
import { useRouter } from 'next/router';
import AlertError from '../../components/AlertError'
import LineChart from '@/components/LineChart';
import Image from 'next/image'
import Spinner from 'react-bootstrap/Spinner';
import GameSelectorBar from '@/components/GameSelectorBar'
import AddMatchMPModal from '@/components/AddMatchMPModal'
import MpPage from '@/components/MultiPage'


function user(props) { //Perfil del usuario donde se muestran  todas las estadisticas

  console.log(props)
  
  return(
    <>
      <CustomNavbar></CustomNavbar>
      <GameSelectorBar mode={props.mode} user={props.user}/>
      <MpPage props={props}></MpPage>
    </>
  )

  }
export default user

export async function getServerSideProps({query}) {
    
  return {
    props: {
      user:query.user,
      mode:query.mode
  }
}
}
