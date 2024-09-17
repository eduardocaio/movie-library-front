'use client'

import { useRouter } from "next/navigation";
import { SlLogin, SlReload } from "react-icons/sl";
import { useEffect, useState } from "react";
import axios from "axios";

import env from "@/config/env.config";
import CustomButton from "@/components/CustomButton";

import './index.scss';

interface Props {
    params: { code: string };
}

export default function VerifyUser({ params }: Props) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        confirmationRegister();
    }, []);

    const handleMoveLogin = () => {
        router.push('/auth/login');
    }

    const handleMoveNewVerify = () => {
        router.push('/auth/verify');
    }

    const confirmationRegister = async () => {
        try {
            await axios.get(`${env.apiUrl}/auth/verify/${params.code}`);
            setMessage('Cadastro confirmado com sucesso!');
            setIsError(false);
        } catch (error) {
            console.log('Request failed');
            let errorMessage = 'Erro ao verificar conta!';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            }
            setMessage(errorMessage);
            setIsError(true);
        }
    }

    return (
        <div className="confirm-container">
            <div className="confirmation-container">
                <p>{message}</p>
            </div>
            <div className="login-container">
                <div className="button-wrapper">
                    {isError ? (
                        <CustomButton
                            startIcon={<SlReload size={18} />}
                            onClick={handleMoveNewVerify}
                        >
                            Solicitar novo código
                        </CustomButton>
                    ) : (
                        <CustomButton
                            startIcon={<SlLogin size={18} />}
                            onClick={handleMoveLogin}
                        >
                            Efetuar Login...
                        </CustomButton>
                    )}
                </div>
            </div>
        </div>
    )
}
