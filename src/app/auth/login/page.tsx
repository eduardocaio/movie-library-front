'use client'

import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer } from "./login.styled";
import { SlLogin } from "react-icons/sl";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import InputErrorMessage from "@/components/InputErrorMessage";

interface LoginForm{
    username: string,
    password: string,
}

export default function Login () {
    const {register, formState: {errors}, handleSubmit} = useForm<LoginForm>();

    const handleSubmitPress = (data: any) => {
        console.log({data})
    }

    return(
        <>
            <LoginContainer>

                <LoginContent>

                    <LoginHeadline>Entre com a sua conta</LoginHeadline>
                
                    <LoginInputContainer>
                        <p>Nome de usuário</p>
                        <CustomInput hasError={!!errors?.username} placeholder="Digite seu usuário..." {...register('username', {required: true})}/>

                        {errors?.username?.type === 'required' && (
                            <InputErrorMessage >O nome de usuário é obrigatório</InputErrorMessage>
                        )}
                    </LoginInputContainer>

                    <LoginInputContainer>
                        <p>Senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite sua senha..." {...register('password', {required: true})} type="password"/>

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage >A senha é obrigatória</InputErrorMessage>
                        )}
                    </LoginInputContainer>

                    <CustomButton startIcon={<SlLogin size={20} />} onClick={() => handleSubmit(handleSubmitPress)()}>ENTRAR</CustomButton>
                    
                </LoginContent>
                
            </LoginContainer>
        </>
    )
}