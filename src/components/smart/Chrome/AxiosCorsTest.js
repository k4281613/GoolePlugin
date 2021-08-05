import React from 'react'
import {Button} from 'antd'
import axios from "../../../lib/https";
function AxiosCorsTest() {
    let bi = process.env.NODE_ENV === "development"?'/bi':'http://bi.camelwifi.cn';
    let getBimMsg=async ()=>{
        let res= await axios.get(bi+'/CW_API/PlatformAimsPay');
        console.log(res)
    }
    let juhe=process.env.NODE_ENV === "development"?'/juhe':'http://v.juhe.cn';
    let getTouTiao = async () => {
        let data=await axios.get(juhe+'/toutiao/index?key=131e6bf62767236380d244d7cceef40d');
        console.log(data)
    };
    let postTouTiao = async () => {
        let data=await axios.post(juhe+'/toutiao/index',{
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
