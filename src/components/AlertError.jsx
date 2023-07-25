import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({errorState,children}) {
  const [showError, setShowError] = useState(true);
  
  useEffect(()=>{
    if (errorState != null) {
      setShowError(true)
      return
    }
    setShowError(false)
  },[errorState])

  if (showError) {
    return (
     
      <Alert variant="danger shadow w-25" onClose={() => setShowError(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {children}
        </p>
      </Alert>
    );
  }
  
}

export default AlertDismissibleExample;