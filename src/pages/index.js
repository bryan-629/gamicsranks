import '../firebase'
import LoginButton from '@/components/LoginButton';
import Navbar from '@/components/Navbar';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import price from "../../public/price.png"


export default function Home() {
  return (
    <div className='bg-dark vh-100'>
      <Navbar></Navbar>
      <div className=" background-container bg-dark container-fluid d-flex justify-content-center align-items-center " style={{ position: "relative", width: "100%", height: "calc(100vh - 60px )" }}>
        <div className='container d-flex justify-content-center align-items-center'>
          <div className='col-md-6 col-sm-12'>
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
                  <LoginButton clases={'btn btn-primary font-roboto'}>REGISTRATE AHORA</LoginButton>
                </div>
              </div>


            </div>
            <div className='col-md-6 h-100'>
              <div>
                <Image src={price} layout='responsive'  objectFit="cover" sizes='100vh' className=' p-5'  alt={"price"}></Image>
              </div>
            </div>
        </div>
      </div>
      <div className='bg-dark'>
        <div className='container geometrias'>
          <div className=''>
            <div className='col-5 d-flex justify-content-center flex-column'>
              <div className='big-number-container'>
                <h1 className='big-number'>01-</h1>
              </div>
              <div>
                <h1 className='text-white font-bebas title'>REGISTRO</h1>
              </div>
              <div>
                <p className='text-white'>
                  Haz clic en el botón 'Registrarse' ubicado en la parte superior derecha de la página de inicio. Completa el formulario de registro Google. Revisa los términos y condiciones, así como la política de privacidad. Haz clic en 'Registrarse' para crear tu cuenta. ¡Felicidades, ahora eres miembro de nuestra comunidad de jugadores!
                </p>
              </div>
            </div>
          </div>
          <div className=' d-flex justify-content-end'>
            <div className='col-5 d-flex justify-content-center flex-column'>
              <div className='big-number-container d-flex justify-content-end'>
                <h1 className='big-number'>02-</h1>
              </div>
              <div>
                <h1 className='text-white font-bebas title'>BUSCA TU PERFIL</h1>
              </div>
              <div>
                <p className='text-white'>
                Una vez registrado, serás redirigido automáticamente a la página donde se muestran tus estadísticas. Aquí podrás explorar tus logros, puntajes más altos, estadísticas generales y más detalles sobre tu progreso en los juegos. ¡Sumérgete en un mundo lleno de diversión y competencia!
                </p>
              </div>
            </div>
          </div>
          <div className=' d-flex align-items-center'>
            <div className='col-5 d-flex justify-content-center flex-column'>
              <div className='big-number-container'>
                <h1 className='big-number'>03-</h1>
              </div>
              <div>
                <h1 className='text-white font-bebas title'>Añadir partidas</h1>
              </div>
              <div>
                <p className='text-white'>
                  Dirígete a la sección 'Añadir partida' en tu perfil, rellena el formulario con los detalles de tu partida, como el juego, la duración, el resultado, etc., haz clic en 'Guardar' o 'Añadir partida' y nuestra aplicación procesará los datos y actualizará tus estadísticas en función de la partida añadida. 
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer>

        </footer>

      </div>
    </div>
  )
}
