import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from '../../Context/AuthProvider';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>)}

