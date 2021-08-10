import React, {useEffect} from 'react'
import {Button} from "antd";
import axios from "../../../lib/https";

function TmallExample() {
    useEffect(() => {

    });
    let getCurrentTabId = () => {
        return new Promise((resolve, reject) => {
            React.$chrome.tabs.query({
                active: true, currentWindow: true
            }, function (tabs) {
                resolve(tabs.length ? tabs[0].id : null)
            })
        })
    };

    let getTmallData = async () => {
        const tabId = await getCurrentTabId();
        React.$chrome.tabs.sendMessage(tabId,
            {type: 'tmall', msg: '尝试获取天猫数据'},
            function (res) {
                console.log('popups收到的回调：' + res)
            })
    };
    let filterArr = () => {
        let arr = [
            {name: '111', b: 'cccc'},
            {name: '111', b: 'aa'},
            {name: '111', b: 'cccc'},
            {name: '111', b: 'cccc'},
            {name: '111', b: 'ada'},
        ]
        let map = new Map();
        arr = arr.filter(item => !map.has(JSON.stringify(item)) && map.set(JSON.stringify(item), 1));
        console.log(arr, map);
    }
    return <>
        <Button onClick={() => getTmallData()}>获取天猫数据</Button>
        <Button onClick={() => filterArr()}>去重测试</Button>
    </>
}

export default TmallExample;
