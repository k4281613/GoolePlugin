import React, {useEffect, useState} from 'react'
import { Button } from 'antd';
import './index.scss'

function Chrome() {
    const buttonGroup=[{name:'Runtime',children:['getBackgroundPage','ma']}];
    const [count, setCount] = useState(0);
    useEffect(() => {
        return () => {
        }
    });
    const addEventListenChrome=(pander,children)=>{
        pander=eval(pander);
        let obj=new pander();
        const fun=obj[children];
        fun()
    }
    function Runtime() {
        this.getBackgroundPage=function () {
            chrome.runtime.getBackgroundPage(Window => {
                console.log(Window)
            })
        }
        this.ma=function () {
            console.log(chrome.runtime.ma)
        }
    }
    //定义按钮元素
    const buttonDom=buttonGroup.map(item=>{
        item.children=item.children.map(citem=> <li key={citem} className={'chromeBtnCon'}><Button onClick={()=>addEventListenChrome(item.name,citem)}>{citem}</Button></li>)
        return <div key={item.name}>
            <h2>{item.name}</h2>
            <ul className={'display_flex'}>{item.children}</ul>
        </div>
    })
    return <div  className={'chrome'}>
        <h1>谷歌插件</h1>
        <div>{buttonDom}</div>
    </div>

}

export default Chrome;
