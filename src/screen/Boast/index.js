import React from 'react'
import {Button} from 'antd'
import './index.scss'

function Boast() {
    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            React.$chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                resolve(tabs.length ? tabs[0].id : null)
            })
        })
    };
    let startBoom = async (msg, type) => {
        let tabId = await getCurrentTabId();
        let req = {msg, type};
        React.$chrome.tabs.sendMessage(tabId, req, function (res) {
            console.log(res)
        })
    }
    let operation = [
        {title:'',msg: '启动炸弹', type: 'boom'},
        {title:'',msg: '暂停炸弹', type: 'pauseBoom'},
        {title:'',msg: '继续炸弹', type: 'continueBoom'},
        {title:'',msg: '控制B站视频', type: 'bilili'},
    ]
    //定义按钮元素
    return <div className={'content_operation display_flex'}>
        {operation.map(item => {
            return <section key={item.type}>
                {/*<h1>{item.title}</h1>*/}
                <div>
                    <Button onClick={() => startBoom('popup:' + item.msg, item.type)}>{item.msg}</Button>
                </div>
            </section>
        })}
    </div>
}

export default Boast;
