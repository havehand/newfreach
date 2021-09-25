import axios from "@/axios/index";

export default {
    getTableList(params){
        return axios.get('/products/all', {params})
    },
    remove(params){
        return axios.delete('/products/'+params.id,  {params: {appkey: params.appkey}});
    },
    add(params){
        return axios.post('/products/add', params)
    },
    detail(id, params){
        return axios.get('/products/'+id, {params});
    },
    edit(params){
        return axios.put('/products/edit', params);
    }
}