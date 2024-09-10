'use client'

import { useForm } from "react-hook-form";
import validator from "validator";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogIn } from "react-icons/fi";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import InputErrorMessage from "@/components/InputErrorMessage";
import { User } from "@/types/user";
import { LoginService } from "@/services/LoginService";
import CustomAlert from "@/components/CustomAlert";

import './index.scss';

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

    const loginService = useMemo(() => new LoginService(), []);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
    const watchPassword = watch('password');
    const router = useRouter();
    const [alertInfo, setAlertInfo] = useState<{ variant: string; message: string } | null>(null);

    useEffect(() => {
        if (alertInfo) {
            const timer = setTimeout(() => {
                setAlertInfo(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    const handleSubmitPress = (data: SignupForm) => {
        const newUser: User = {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password
        };


        setTimeout(() => {
            router.push('/auth/login');
        }, 5000);

        loginService.newRegister(newUser).then((response) => {
            setAlertInfo({
                variant: 'success',
                message: 'Usuário registrado com sucesso. Confirme seu cadastro com o link enviado para seu e-mail!'
            });
        }).catch((error) => {
            const errorMessage = error?.response?.data?.message || 'Erro ao cadastrar!';
            setAlertInfo({
                variant: 'danger',
                message: errorMessage
            });
        });

    }

    return (
        <>
            <div>
                {alertInfo && <CustomAlert variant={alertInfo.variant} message={alertInfo.message} />}
            </div>

            <div className='signUpContainer'>
                <div className='signUpContent'>
                    <p className='signUpHeadline'>Crie sua conta</p>

                    <div className='signUpInputContainer'>
                        <p>Nome completo</p>
                        <CustomInput hasError={!!errors?.name} placeholder="Digite seu nome..." {...register('name', { required: true })} />
                        {errors?.name?.type === 'required' && (
                            <InputErrorMessage>O nome completo é obrigatório</InputErrorMessage>
                        )}
                    </div>

                    <div className='signUpInputContainer'>
                        <p>Nome de usuário</p>
                        <CustomInput hasError={!!errors?.username} placeholder="Digite seu nome de usuário..." {...register('username', { required: true })} />
                        {errors?.username?.type === 'required' && (
                            <InputErrorMessage>O nome de usuário é obrigatório</InputErrorMessage>
                        )}
                    </div>

                    <div className='signUpInputContainer'>
                        <p>E-mail</p>
                        <CustomInput
                            hasError={!!errors?.email}
                            placeholder="Digite seu e-mail..."
                            {...register('email', { required: true, validate: (value) => validator.isEmail(value) })}
                        />
                        {errors?.email?.type === 'required' && (
                            <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>
                        )}
                        {errors?.email?.type === 'validate' && (
                            <InputErrorMessage>Por favor, insira um e-mail válido</InputErrorMessage>
                        )}
                    </div>

                    <div className='signUpInputContainer'>
                        <p>Senha</p>
                        <CustomInput
                            hasError={!!errors?.password}
                            placeholder="Digite sua senha..."
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
                        )}
                    </div>

                    <div className='signUpInputContainer'>
                        <p>Confirmação de senha</p>
                        <CustomInput
                            hasError={!!errors?.confirmPassword}
                            placeholder="Digite novamente sua senha..."
                            type="password"
                            {...register('confirmPassword', { required: true, validate: (value) => value === watchPassword })}
                        />
                        {errors?.confirmPassword?.type === 'required' && (
                            <InputErrorMessage>É necessário fazer a confirmação da senha</InputErrorMessage>
                        )}
                        {errors?.confirmPassword?.type === 'validate' && (
                            <InputErrorMessage>As senhas não correspondem</InputErrorMessage>
                        )}
                    </div>

                    <div className="link-container">
                        <p className="link-item" onClick={() => router.push('/auth/login')}>Já tenho conta...</p>
                    </div>

                    <CustomButton startIcon={<FiLogIn size={18} />} onClick={() => handleSubmit(handleSubmitPress)()}>CRIAR CONTA</CustomButton>

                </div>
            </div>
        </>
    )
}
