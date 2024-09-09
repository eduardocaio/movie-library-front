import Alert from 'react-bootstrap/Alert';

interface CustomAlertProps {
  variant: string;
  message: string;
}

function CustomAlert({ variant, message }: CustomAlertProps) {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}

export default CustomAlert;
