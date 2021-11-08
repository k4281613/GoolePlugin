
import React from 'react'
import {Button} from 'antd'

function Boast() {
    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            React.$chrome.tabs.query({active:true,currentWindow:true},function (tabs) {
                resolve(tabs.length?tabs[0].id:null)
            })
        })
    };
    let startBoom=async ()=> {
        let tabId=await getCurrentTabId();
        let req={
            msg:'popup:启动炸弹',
            type:'boom'
        }
        React.$chrome.tabs.sendMessage(tabId,req,function (res) {
            console.log(res)
        })
    }
    //定义按钮元素
    return <div className={'chrome'}>
        <section>
            <h1>启动炸弹</h1>
            <div>
                <Button onClick={()=>startBoom()}>开始</Button>
            </div>
        </section>
    </div>
}

export default Boast;
