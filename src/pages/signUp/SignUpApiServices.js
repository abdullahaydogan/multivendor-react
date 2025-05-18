import axios from "axios";


export function signUp(body){
    return axios.post('https://localhost:7079/api/authentication',body);
}