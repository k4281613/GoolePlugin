import React from 'react'
import {Button} from 'antd'
//import './index.css'

function NotificChrome() {
    function Notific() {
        try {
            React.$chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'logo192.png',
                title: '这是标题',
                message: '您刚才点击了自定义右键菜单！'
            });
        }catch (e) {
            throw e
        }

    }
    return <>
        <Button onClick={() => Notific()}>发出通知</Button>
    </>
}

export default NotificChrome;
