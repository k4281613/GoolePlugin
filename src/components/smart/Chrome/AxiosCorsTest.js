import React from 'react'
import {Button} from 'antd'
import axios from "../../../lib/https";
let baseURL=process.env.NODE_ENV==='development'?'':'http://v.juhe.cn'
function AxiosCorsTest() {
    let getTouTiao = async () => {
        let data=await axios.get(baseURL+'/toutiao/index?key=131e6bf62767236380d244d7cceef40d');
        console.log(data)
    };
    let postTouTiao = async () => {
        let data=await axios.post(baseURL+'/toutiao/index',{
            key:'131e6bf62767236380d244d7cceef40d'
        });
        console.log(data)
    };
    return <>
        <Button onClick={()=>getTouTiao()}>测试get请求</Button>
        <Button style={{marginLeft:'10px'}} onClick={()=>postTouTiao()} >测试post请求</Button>
    </>
}

export default AxiosCorsTest;
