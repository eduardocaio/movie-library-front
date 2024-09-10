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
import { Password } from "@/types/password";

interface ForgotForm {
    password: string,
    confirmPassword: string
}

interface Props {
    params: { code: string };
}

export default function NewPassword({params}: Props) {

    const loginService = useMemo(() => new LoginService(), []);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ForgotForm>();
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

    const handleSubmitPress = (data: ForgotForm) => {

        const newPassword: Password = {
            password: data.password,
        };

        loginService.newPassword(newPassword, params.code).then((response) => {
            setAlertInfo({
                variant: 'success',
                message: 'Senha redefinida com sucesso!'
            });

            setTimeout(() => {
                router.push('/auth/login');
            }, 5000);

        }).catch((error) => {
            const errorMessage = error?.response?.data?.message || 'Erro ao redefinir!';
            setAlertInfo({
                variant: 'danger',
                message: errorMessage
            });
            router.push("/auth/forgot-password");
        });

    }

    return (
        <>
            <div>
                {alertInfo && <CustomAlert variant={alertInfo.variant} message={alertInfo.message} />}
            </div>

            <div className='signUpContainer'>
                <div className='signUpContent'>
                    <p className='signUpHeadline'>Redefina sua senha</p>

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

                    <CustomButton startIcon={<FiLogIn size={18} />} onClick={() => handleSubmit(handleSubmitPress)()}>REDEFINIR SENHA</CustomButton>

                </div>
            </div>
        </>
    )
}
