import axios from "@/axios/index";
export default {
    login(params){
        return axios.post('/passport/login', params);
    }
}