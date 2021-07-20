import axios from 'axios'
import { message } from 'antd';
let loading=null;
const instance = axios.create({
    // baseURL:process.env.NODE_ENV==='development'?'':'',
    withCredentials:true,
    crossDomain:true
})
instance.interceptors.request.use(
    config=>{
        if(loading)message.destroy();
        loading=message.loading({content: '加载中...'});
        return config
    },
    error => {
        loading=message.error({
            content:'请求失败'
        });
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    res=>{
        if(loading)message.destroy();
        loading=message.success({content:'请求成功'})
        return res.data
    },
    error => {
        message.destroy();
        Promise.reject(JSON.parse(JSON.stringify(error)))
    }
)
export default instance;
