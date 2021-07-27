import React from 'react'
import {Button} from 'antd'
//import './index.css'

function Extension() {
    function getExtension(){
        console.log(React.$chrome.extension)
    }
    function getPopup(){
        window.open(React.$chrome.extension.getURL('index.html'))
    }
    function getBackground(){
        window.open(React.$chrome.extension.getURL('_generated_background_page.html'))
    }
    return <>
        <Button onClick={() => getExtension()}>获取extension信息</Button>
        <Button onClick={() => getPopup()}>打开popup页面</Button>
        <Button onClick={() => getBackground()}>打开默认的背景页</Button>
    </>
}

export default Extension;
