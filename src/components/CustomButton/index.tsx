import { CustomButtonContainer, IconContainer } from "./custom-button.styled";
import { FunctionComponent, ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: string,
    startIcon?: React.ReactNode,
}

const CustomButton:FunctionComponent<CustomButtonProps> = ({children, startIcon, ...rest}) => {
    return(
        <CustomButtonContainer {...rest}>
            {startIcon && <IconContainer>{startIcon}</IconContainer>}
            {children}
        </CustomButtonContainer>
    )
}

export default CustomButton;