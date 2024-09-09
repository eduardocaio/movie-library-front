'use client'

import { useRouter } from "next/navigation";
import { SlLogin } from "react-icons/sl";
import { useEffect } from "react";
import axios from "axios";

import env from "@/config/env.config";
import CustomButton from "@/components/CustomButton";

import './index.scss';

interface Props {
    params: { code: string };
}

export default function VerifyUser({ params }: Props) {

    const router = useRouter();

    useEffect(() => {
        confirmationRegister();
    }, [])

    const handleMoveLogin = () => {
        router.push('/auth/login');
    }

    const confirmationRegister = async () => {
        await axios.get(`${env.apiUrl}/auth/verify/${params.code}`);
    }

    return (
        
        <div className="confirm-container">
            <div className="confirmation-container">
                <p>Cadastro confirmado com sucesso!</p>
            </div>
            <div className="login-container">
            <CustomButton startIcon={<SlLogin size={18} />} onClick={handleMoveLogin}>
                Efetuar Login...
            </CustomButton>
            </div>
        </div>
    )
}
