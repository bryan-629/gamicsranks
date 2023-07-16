import '../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Navbar from '@/components/Navbar';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import price from "../../public/price.png"


export default function Home() {
  const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const singIn = async () => {
        const result = await signInWithPopup(auth,provider)
        console.log(result.user)
    }
  return (
    <div className='bg-dark vh-100'>
      <Navbar></Navbar>
      <div className=" background-container bg-dark container-fluid d-flex justify-content-center align-items-center px-5 " style={{position:"relative", width:"100%", height:"calc(100vh - 60px )"}}>
        
          <div className='col-5 '>
            <div className=''>
              <div>
                <h1 className='text-white display-1 font-bebas'>¡DOMINA EL JUEGO!</h1>
              </div>
              <div>
                <h1 className='text-white display-3 font-bebas'>ESTADISTICAS DE CALL OF DUTY</h1>
              </div>
              <div>
                <p className='text-white font-open'>
                Aquí encontrarás información detallada sobre las rankeds de call of duty. 
                Regístrate para obtener acceso exclusivo y disfruta de una experiencia única de seguimiento
                y comparación de tus estadísticas con otros jugadores en línea. 
                Explora tu perfil personalizado, descubre datos interesantes sobre tu rendimiento 
                y encuentra inspiración para mejorar tus habilidades en el mundo de los videojuegos. 
                Únete a nuestra comunidad y descubre el fascinante mundo de las estadísticas de videojuegos. 
                ¡Comienza tu aventura hoy!
                </p>
                <Button type='primary font-roboto'>REGISTRATE AHORA</Button>
              </div>
            </div>
            
              
          </div>
          <div className='col-4'>
            <Image src={price} objectFit='cover' alt={"price"}></Image>
          </div>
      </div>
    </div>
  )
}
