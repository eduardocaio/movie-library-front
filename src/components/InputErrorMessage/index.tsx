import { FunctionComponent, ReactNode } from 'react';
import './index.scss'; 

interface InputErrorMessageProps {
    children: ReactNode;
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({ children }) => {
  return <p className="input-error-message">{children}</p>;
};

export default InputErrorMessage;
