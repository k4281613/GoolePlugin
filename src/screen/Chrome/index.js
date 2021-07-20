import React from 'react'
import ChromeStorage from '../../components/smart/Chrome/ChromeStorage.js'
import AxiosCorsTest from '../../components/smart/Chrome/AxiosCorsTest.js'

import './index.scss'

function Chrome() {
    function Notific() {
        this.notifications = function () {
            React.$chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'logo192.png',
                title: '这是标题',
                message: '您刚才点击了自定义右键菜单！'
            });
        }
    }

    //定义按钮元素
    return <div className={'chrome'}>

        <section>
            <h1>谷歌插件</h1>
            <div className={'chromectx'}>
                <ChromeStorage />
            </div>
        </section>

        <section>
            <h1>跨域请求</h1>
            <div className={'display_flex'}>
                <AxiosCorsTest />
            </div>
        </section>
    </div>

}

export default Chrome;
