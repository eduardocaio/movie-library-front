import env from "@/config/env.config";
import { User } from "@/types/user";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${env.apiUrl}`
})

export class LoginService{

    newRegister(newUser: User){
        return axiosInstance.post('/auth/signup', newUser);
    }

    login(username: string, password: string){
        return axiosInstance.post('/auth/login', {username: username, password: password})
    }
}