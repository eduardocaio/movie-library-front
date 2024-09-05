'use client'

import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer } from "./login.styled";


export default function Login () {
    return(
        <>
            <LoginContainer>

                <LoginContent>

                    <LoginHeadline>Entre com a sua conta</LoginHeadline>

                    <LoginInputContainer></LoginInputContainer>

                    <LoginInputContainer></LoginInputContainer>
                    
                </LoginContent>
                
            </LoginContainer>
        </>
    )
}