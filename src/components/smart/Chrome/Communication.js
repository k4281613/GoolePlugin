import React, {useEffect} from 'react'
import {Button} from "antd";
import axios from "../../../lib/https";

//import './index.css'

function Communication() {
    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                resolve(tabs.length ? tabs[0].id : null)
            });
        })
    };
    let sendMessage = async () => {
        //popup和background只有一个能回信息，其中一个回了，其他不会回
        const tabId = await getCurrentTabId();
        // 在背景页面发送消息，需要当前 tabID
        chrome.tabs.sendMessage(tabId, '我是popup，我在发送消息', function (res) {
            console.log('popup：', res)
        });
    };
    let getBimMsg = async () => {
        let res = await axios.get('http://bi.camelwifi.cn/CW_API/PlatformAimsPay');
        console.log(res)
    };
    useEffect(() => {
        React.$chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
            if (req.type === 'popup') {
                console.log('我是popup，我接收了来自 content.js的消息：', req)
                sendResponse('哈哈哈，popup成功了')
                if (req.msg === 'BI') getBimMsg('收到了content的消息')
                sendMessage();
            }
        })
    });
    let sendToBackground = () => {
        let bg = React.$chrome.extension.getBackgroundPage();
        console.log('我是popup页面,正则向background发送消息')
        bg.getBimMsg('收到了popup页面的消息，我是background页面，')
    };
    return <>
        <div className={'display_flex'}>
            <Button onClick={() => sendToBackground()}>popup向background.js发送消息</Button>
            <Button onClick={() => sendMessage()}>popup向content_scrip或者background发送消息</Button>
            备注：popup接受信息需要打开弹窗
        </div>
    </>
}

export default Communication;
