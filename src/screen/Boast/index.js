import React, {useState, useEffect} from 'react'
import {Button} from 'antd'
import {InputNumber} from 'antd';
import './index.scss'

function Boast() {
    const [boomvelocity, setBoomVelocity] = useState(100);
    useEffect(() => {
        console.log(boomvelocity)
    }, [boomvelocity])

    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            React.$chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                resolve(tabs.length ? tabs[0].id : null)
            })
        })
    };

    let startBoom = async (msg, type,anyParams) => {
        let tabId = await getCurrentTabId();
        let req = {msg, type,...anyParams};
        React.$chrome.tabs.sendMessage(tabId, req, function (res) {
            console.log(res)
        })
    }

    let operation = [
        {title: '', msg: '启动炸弹', type: 'boom'},
        {title: '', msg: '暂停炸弹', type: 'pauseBoom'},
        {title: '', msg: '继续炸弹', type: 'continueBoom'},
        {title: '', msg: '控制B站视频', type: 'bilili'},
    ]
    //定义按钮元素
    return <div className={'content_operation display_flex'}>
        <section>
            <div style={{lineHeight: '33px'}}>
                <span>炸弹速度：</span>
                <InputNumber onChange={(value) => setBoomVelocity(value)} value={boomvelocity}/>
                <Button onClick={() => startBoom('popup:改变速率'+boomvelocity , 'changeBoomVelocity',{time:boomvelocity})}>确定</Button>
            </div>
        </section>
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
