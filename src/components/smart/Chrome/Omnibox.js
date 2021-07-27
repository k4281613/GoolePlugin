import React from 'react'

//import './index.css'

function Omnibox() {
    return <>
        <div className={'textStyle'}>Omnibox需要再json中注册权限，设置触发关键字，本项目设置的关键字是test（浏览器路径中输入test,再按tab触发）。含有五个监听事件：onInputChanged（输入变化），onDeleteSuggestion（删除建议），onInputCancelled（取消输入），onInputEntered（输入确定），onInputStarted（输入开始）。详情见background.js</div>
    </>
}

export default Omnibox;
