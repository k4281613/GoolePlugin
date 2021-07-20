import React, {useEffect, useState} from 'react'
import {Button, Input} from "antd";
function ChromeStorage() {
    const [synkey, setSynKey] = useState('');
    const [synvalue, setSynValue] = useState('');

    const [localkey, setlocalKey] = useState('');
    const [localvalue, setlocalValue] = useState('');

    const stroageConstruct= {
        setSync : function () {
            let obj = {};
            obj[synkey] = synvalue;
            if(!synkey || !synvalue)alert('请输入');
            React.$chrome.storage.sync.set(obj, function () {
                console.log(JSON.stringify(obj) + '用户存储设置成功');
            })
        },
        getSync : function () {
            //params1:string || array
            if(!synkey)alert('请输入')
            React.$chrome.storage.sync.get([synkey], function (res) {
                console.log(res)
            });
        },
        setlocal : function () {
            let obj = {};
            obj[localkey] = localvalue;
            if(!localkey || !localvalue)alert('请输入')
            React.$chrome.storage.local.set(obj, function () {
                console.log(JSON.stringify(obj) + '本地存储设置成功')
            })
        },
        getlocal : function () {
            if(!localkey)alert('请输入')
            React.$chrome.storage.local.get([localkey], function (res) {
                console.log(res)
            })
        }
    }

    return <>
        <div className={'storage'}>
            <h2>storage</h2>
            <ul className={'chromeBtnCon'}>
                <li className={'display_flex'}>
                    <div>设置用户存储（storage.sync）</div>
                    <Input value={synkey} onChange={(e) => setSynKey(e.target.value)} size="medium"/>
                    <div>:</div>
                    <Input value={synvalue} onChange={(e) => setSynValue(e.target.value)} size="medium"/>
                    <Button onClick={() => stroageConstruct.setSync()}>设置</Button>
                    <Button onClick={() => stroageConstruct.getSync()}>获取</Button>
                </li>
                <li className={'display_flex'}>
                    <div>设置本地存储（storage.loacl）</div>
                    <Input value={localkey} onChange={(e) => setlocalKey(e.target.value)} size="medium"/>
                    <div>:</div>
                    <Input value={localvalue} onChange={(e) => setlocalValue(e.target.value)} size="medium"/>
                    <Button onClick={() => stroageConstruct.setlocal()}>设置</Button>
                    <Button onClick={() => stroageConstruct.getlocal()}>获取</Button>
                </li>
            </ul>
        </div>
    </>
}

export default ChromeStorage;
