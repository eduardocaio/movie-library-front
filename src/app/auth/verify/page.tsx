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
import validator from "validator";
import { Email } from "@/types/email";

interface EmailForm {
    email: string,
}


export default function NewVerify() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<EmailForm>();
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

    const handleSubmitPress = (data: EmailForm) => {
        const emailConfirm: Email = {
            email: data.email,
        };

        loginService.newVerifyCode(emailConfirm).then((response) => {
            setAlertInfo({
                variant: 'success',
                message: 'Link de redefinição enviado para o e-mail informado. Favor verificar sua caixa de entrada ou SPAM!'
            });

        }).catch((error) => {
            const errorMessage = error?.response?.data?.message || 'Erro ao enviar link!';
            setAlertInfo({
                variant: 'danger',
                message: errorMessage
            });
            reset({ email: '' });
        });

    }

    return (
        <>
            <div>
                {alertInfo && <CustomAlert variant={alertInfo.variant} message={alertInfo.message} />}
            </div>
            <div className='loginContainer'>

                <div className='loginContent'>

                    <p className='loginHeadline'>Confirme seu e-mail</p>

                    <div className='loginInputContainer'>
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

                    <CustomButton startIcon={<SlLogin size={20} />} onClick={() => handleSubmit(handleSubmitPress)()}>SOLICITAR NOVO CÓDIGO</CustomButton>

                </div>

            </div>
        </>
    )
}
