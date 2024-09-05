'use client'

import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from "./signup.styled";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import InputErrorMessage from "@/components/InputErrorMessage";

interface SignUpForm{
    name: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

export default function Signup (){
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const watchPassword = watch('password');

    const handleSubmitPress = (data: any) => {
        console.log({data})
    }

    return(
        <>

            <SignUpContainer>
                <SignUpContent>
                    <SignUpHeadline>Crie sua conta</SignUpHeadline>

                    <SignUpInputContainer>

                        <p>Nome completo</p>
                        <CustomInput hasError={!!errors?.name} placeholder="Digite seu nome..." {...register('name', {required: true})} />

                        {errors?.name?.type === 'required' && (
                            <InputErrorMessage >O nome completo é obrigatório</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Nome de usuário</p>
                        <CustomInput hasError={!!errors?.username} placeholder="Digite seu nome de usuário..." {...register('username', {required: true})} />

                        {errors?.username?.type === 'required' && (
                            <InputErrorMessage >O nome de usuário é obrigatório</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>E-mail</p>
                        <CustomInput hasError={!!errors?.email} placeholder="Digite seu e-mail..." {...register('email', {required: true, validate: (value) => {return validator.isEmail(value)}})} />

                        {errors?.email?.type === 'required' && (
                            <InputErrorMessage >O e-mail é obrigatório</InputErrorMessage>
                        )}

                        {errors?.email?.type === 'validate' && (
                            <InputErrorMessage >Por favor, insira um e-mail válido</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite sua senha..." type="password" {...register('password', {required: true})} />

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage >A senha é obrigatória</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>

                        <p>Confirmação de senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite novamente sua senha..." type="password" {...register('confirmPassword', {required: true, validate: (value) => {return value === watchPassword}})}/>

                        {errors?.confirmPassword?.type === 'required' && (
                            <InputErrorMessage >É necessário fazer a confirmação da senha</InputErrorMessage>
                        )}

                        {errors?.confirmPassword?.type === 'validate' && (
                            <InputErrorMessage >As senhas não correspondem</InputErrorMessage>
                        )}

                    </SignUpInputContainer>
                    
                    <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() => handleSubmit(handleSubmitPress)()}>CRIAR CONTA</CustomButton>

                </SignUpContent>
            </SignUpContainer>

        </>
    )
}