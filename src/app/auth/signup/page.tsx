'use client'

import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from "./signup.styled";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Toast } from 'primereact/toast';
import { useMemo, useRef, useState } from "react";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import InputErrorMessage from "@/components/InputErrorMessage";
import { User } from "@/types/user";
import { LoginService } from "@/services/LoginService";

interface SignupForm {
    name: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

export default function Signup() {

    let userEmpty: User = {
        name: '',
        username: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState<User>(userEmpty);
    const loginService = useMemo(() => new LoginService, []);
    const toast = useRef<Toast>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
    const watchPassword = watch('password');

    const handleSubmitPress = (data: SignupForm) => {
        const newUser: User = {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password
        };

        setUser(newUser);

        console.log(newUser)
        
        loginService.newRegister(newUser).then((response) => {
            setUser(userEmpty);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso!',
                detail: 'Usuário cadastrado com sucesso!'
            });
        }).catch((error) => {
            const errorMessage = error?.data?.message || 'Erro ao cadastrar!';
            console.log(errorMessage);
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao cadastrar!'
            })
        });

    }

    return (
        <>

            <SignUpContainer>
                <Toast ref={toast} />
                <SignUpContent>
                    <SignUpHeadline>Crie sua conta</SignUpHeadline>

                    <SignUpInputContainer>

                        <p>Nome completo</p>
                        <CustomInput hasError={!!errors?.name} placeholder="Digite seu nome..." {...register('name', { required: true })} />

                        {errors?.name?.type === 'required' && (
                            <InputErrorMessage >O nome completo é obrigatório</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Nome de usuário</p>
                        <CustomInput hasError={!!errors?.username} placeholder="Digite seu nome de usuário..." {...register('username', { required: true })} />

                        {errors?.username?.type === 'required' && (
                            <InputErrorMessage >O nome de usuário é obrigatório</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>E-mail</p>
                        <CustomInput hasError={!!errors?.email} placeholder="Digite seu e-mail..." {...register('email', { required: true, validate: (value) => { return validator.isEmail(value) } })} />

                        {errors?.email?.type === 'required' && (
                            <InputErrorMessage >O e-mail é obrigatório</InputErrorMessage>
                        )}

                        {errors?.email?.type === 'validate' && (
                            <InputErrorMessage >Por favor, insira um e-mail válido</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite sua senha..." type="password" {...register('password', { required: true })} />

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage >A senha é obrigatória</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Confirmação de senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite novamente sua senha..." type="password" {...register('confirmPassword', { required: true, validate: (value) => { return value === watchPassword } })} />

                        {errors?.confirmPassword?.type === 'required' && (
                            <InputErrorMessage >É necessário fazer a confirmação da senha</InputErrorMessage>
                        )}

                        {errors?.confirmPassword?.type === 'validate' && (
                            <InputErrorMessage >As senhas não correspondem</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <CustomButton startIcon={<FiLogIn size={18} />} onClick={() => handleSubmit(handleSubmitPress)()}>CRIAR CONTA</CustomButton>

                </SignUpContent>
            </SignUpContainer>

        </>
    )
}