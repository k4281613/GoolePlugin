
import React from 'react'
import ChromeStorage from '../../components/smart/Chrome/ChromeStorage.js'
import AxiosCorsTest from '../../components/smart/Chrome/AxiosCorsTest.js'
import NotificChrome from '../../components/smart/Chrome/NotificChrome.js'
import Omnibox from '../../components/smart/Chrome/Omnibox.js'
import TextMenus from '../../components/smart/Chrome/TextMenus.js'
import './index.scss'

function Chrome() {
    let list = [
        {title: '谷歌插件', Component: <ChromeStorage/>, className: 'chromectx'},
        {title: '跨域请求', Component: <AxiosCorsTest/>, className: 'display_flex'},
        {title: '桌面通知', Component: <NotificChrome/>, className: 'display_flex'},
        {title: '关键字', Component: <Omnibox/>, className: ''},
        {title: '右键菜单', Component: <TextMenus/>, className: ''},
    ];
    //定义按钮元素
    return <div className={'chrome'}>
        {list.map(item => {
            return <section key={item.title}>
                <h1>{item.title}</h1>
                <div className={item.className}>
                    {item.Component}
                </div>
            </section>
        })}
    </div>
}

export default Chrome;
