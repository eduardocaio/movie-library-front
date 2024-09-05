'use client'

import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer } from "./login.styled";
import { SlLogin } from "react-icons/sl";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

export default function Login () {
    return(
        <>
            <LoginContainer>

                <LoginContent>

                    <LoginHeadline>Entre com a sua conta</LoginHeadline>

                    <LoginInputContainer><CustomInput placeholder="Digite seu usuário..."/></LoginInputContainer>

                    <LoginInputContainer><CustomInput placeholder="Digite sua senha..."/></LoginInputContainer>

                    <CustomButton startIcon={<SlLogin size={20} />}>ENTRAR</CustomButton>
                    
                </LoginContent>
                
            </LoginContainer>
        </>
    )
}