import React, {useEffect} from 'react'
import {Button} from "antd";

//import './index.css'

function Communication() {
    useEffect(() => {
        return () => {
        }
    }, [])
    let sendToBackground = () => {
        let bg = React.$chrome.extension.getBackgroundPage();
        console.log('我是pupup页面,正则向background发送消息')
        bg.getBimMsg('收到了popup页面的消息，我是background页面，')
    }
    return <>
        <div>
            <Button onClick={() => sendToBackground()}>popup向background.js发送消息</Button>
        </div>
    </>
}

export default Communication;
