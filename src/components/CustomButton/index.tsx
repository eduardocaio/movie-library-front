import { FunctionComponent, ButtonHTMLAttributes } from "react";

import "./index.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string,
    startIcon?: React.ReactNode,
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({ children, startIcon, ...rest }) => {
    return (
        <button className='customButtonContainer' {...rest}>
            {startIcon && <div className='iconContainer'>{startIcon}</div>}
            {children}
        </button>
    );
}

export default CustomButton;
