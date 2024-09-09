'use client'

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlLogin } from "react-icons/sl";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import InputErrorMessage from "@/components/InputErrorMessage";
import CustomAlert from "@/components/CustomAlert";
import { LoginService } from "@/services/LoginService";

import './index.scss';

interface LoginForm {
    username: string,
    password: string,
}

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>();
    const loginService = useMemo(() => new LoginService(), [])
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

    const handleSubmitPress = (data: any) => {
        loginService.login(data.username, data.password).then((response) => {
            localStorage.setItem('TOKEN_API_BACKEND', response.data.acessToken);
            setAlertInfo({
                variant: 'success',
                message: 'Logado com sucesso'
            });
            window.location.reload()

            window.location.href = '/'

            setTimeout(() => {
                router.refresh();
              }, 500);        

        }).catch((error) => {
            const errorMessage = error?.response?.data?.message || 'Erro ao entrar na conta!';
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
            <div className='loginContainer'>

                <div className='loginContent'>

                    <p className='loginHeadline'>Entre com a sua conta</p>

                    <div className='loginInputContainer'>
                        <p>Nome de usuário</p>
                        <CustomInput hasError={!!errors?.username} placeholder="Digite seu usuário..." {...register('username', { required: true })} />

                        {errors?.username?.type === 'required' && (
                            <InputErrorMessage >O nome de usuário é obrigatório</InputErrorMessage>
                        )}
                    </div>

                    <div className='loginInputContainer'>
                        <p>Senha</p>
                        <CustomInput hasError={!!errors?.password} placeholder="Digite sua senha..." {...register('password', { required: true })} type="password" />

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage >A senha é obrigatória</InputErrorMessage>
                        )}
                    </div>

                    <CustomButton startIcon={<SlLogin size={20} />} onClick={() => handleSubmit(handleSubmitPress)()}>ENTRAR</CustomButton>

                </div>

            </div>
        </>
    )
}
