import React, {useState} from 'react'
import {Button} from 'antd'

//import './index.css'

function GetCurrent() {
    const [id, setId] = useState(0);

    //const [变量名,操作函数]=useState(初始值);
    function getCurrent() {
        React.$chrome.windows.getCurrent((res) => {
            console.log('窗口信息' , res)
            setId(res.id)
        })
    }

    return <>
        <Button onClick={() => getCurrent()}>获取窗口ID，打印窗口信息</Button>
        <div style={{width: '100px', lineHeight: '32px'}}>{id}</div>
    </>
}

export default GetCurrent;
