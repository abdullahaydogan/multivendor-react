import axios from "axios";


export function shareProduct(body) {
    return axios.post('https://localhost:7079/api/Product/add', body);
}