import React, {useState, useEffect} from 'react'
import {Button} from 'antd'
import {InputNumber} from 'antd';
import './index.scss'

function Boast() {
    const menus = [
        {title: '炸弹/小黄豆速度：', value: 100, type: 'changeBoomVelocity', params: {}},
        {title: '小黄豆转向频率：', value: 5, type: 'changePositionQrequency', params: {}},
        {title: '小黄豆转向位移：', value: 100, type: 'changeOffset', params: {}},
    ]
    const [boomStatus, setBoomStatus] = useState(menus);
    useEffect(() => {
        console.log(boomStatus)
    }, [boomStatus])
    let setBoomStatusFun = (type, value) => {
        let arr = boomStatus.map(item => {
            if (item.type === type) item.value = value;
            return item;
        })
        setBoomStatus(arr);
    }
    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            React.$chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                resolve(tabs.length ? tabs[0].id : null)
            })
        })
    };

    let startBoom = async (msg, type, anyParams) => {
        let tabId = await getCurrentTabId();
        let req = {msg, type, ...anyParams};
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
        {boomStatus.map(item => {
            return <section key={item.type}>
                <div style={{lineHeight: '33px'}}>
                    <span>{item.title}</span>
                    <InputNumber onChange={(value) => setBoomStatusFun(item.type, value)} value={item.value}/>
                    <Button
                        onClick={() => startBoom('popup:' + item.title + item.value, item.type, {value: item.value})}>确定</Button>
                </div>
            </section>
        })}
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
