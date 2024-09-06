'use client'

import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer } from "./login.styled";
import { SlLogin } from "react-icons/sl";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import InputErrorMessage from "@/components/InputErrorMessage";
import { useMemo, useRef } from "react";
import { LoginService } from "@/services/LoginService";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

interface LoginForm{
    username: string,
    password: string,
}

export default function Login () {

    const {register, formState: {errors}, handleSubmit} = useForm<LoginForm>();
    const loginService = useMemo(() => new LoginService(), [])
    const toast = useRef<Toast>(null);
    const router = useRouter();


    const handleSubmitPress = (data: any) => {
        loginService.login(data.username, data.password).then((response) => {
            localStorage.setItem('TOKEN_API_BACKEND', response.data.acessToken);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso!',
                detail: 'Usuário logado com sucesso!'
            });

            router.push('/');

        }).catch((error) => {
            const errorMessage = error?.data?.message || 'Erro ao cadastrar!';
            console.log(errorMessage);
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao logar, usuário ou senha inválidos!'
            })
        });
    }

    return(
        <>
            <LoginContainer>
                <Toast ref={toast} />

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