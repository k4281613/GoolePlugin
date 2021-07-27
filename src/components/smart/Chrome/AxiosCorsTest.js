import React from 'react'
import {Button} from 'antd'
import axios from "../../../lib/https";
let baseURL=process.env.NODE_ENV==='development'?'':'http://v.juhe.cn'
function AxiosCorsTest() {
    let getTouTiao = async () => {
        let data=await axios.get(baseURL+'/toutiao/index?key=131e6bf62767236380d244d7cceef40d');
        console.log(data)
    };
    let getBimMsg=async ()=>{
        let res= await axios.get('http://bi.camelwifi.cn/CW_API/PlatformAimsPay');
        console.log(res)
    }
    let postTouTiao = async () => {
        let data=await axios.post(baseURL+'/toutiao/index',{
            key:'131e6bf62767236380d244d7cceef40d'
        });
        console.log(data)
    };
    return <>
        <Button onClick={()=>getTouTiao()}>测试get请求</Button>
        <Button style={{marginLeft:'10px'}} onClick={()=>postTouTiao()} >测试post请求</Button>
        <Button style={{marginLeft:'10px'}} onClick={()=>getBimMsg()} >测试BI请求</Button>
    </>
}

export default AxiosCorsTest;
