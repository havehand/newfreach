import axios from "@/axios/index";

export default {
    list(params){
        return axios.get('/category/all', {params})
    }
}