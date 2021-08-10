/*---------------------------右键菜单显示 演示-----------------------*/
chrome.contextMenus.create({
    title: "测试右键菜单",
    onclick: function () {
        alert('您点击了右键菜单！');
    }
});
chrome.contextMenus.create({
    title: '使用度娘搜索：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});
/*---------------------------omnibox 演示-----------------------*/
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if (!text) return;
    if (text === '美女') {
        suggest([
            {content: '中国' + text, description: '你要找“中国美女”吗？'},
            {content: '日本' + text, description: '你要找“日本美女”吗？'},
            {content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
            {content: '韩国' + text, description: '你要找“韩国美女”吗？'}
        ]);
    } else if (text === '微博') {
        suggest([
            {content: '新浪' + text, description: '新浪' + text},
            {content: '腾讯' + text, description: '腾讯' + text},
            {content: '搜狐' + text, description: '搜索' + text},
        ]);
    } else {
        suggest([
            {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
            {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
        ]);
    }
});
chrome.omnibox.onInputEntered.addListener((text) => {
    if (!text) return;
    var href = '';
    if (text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
    else if (text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if (text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    openUrlCurrentTab(href);
});// 当用户接收关键字建议时触发
chrome.omnibox.onInputCancelled.addListener(() => {
    console.log("[" + new Date() + "] omnibox event: onInputCancelled");
});// 取消输入时触发的事件，注意使用上下方向键在搜索建议列表中搜搜也会触发此事件
chrome.omnibox.onInputEntered.addListener(text => {
    console.log("输入 " + text);
});// 当删除了搜索建议时触发的
chrome.omnibox.onDeleteSuggestion.addListener(text => {
    console.log("[" + new Date() + "] omnibox event: onDeleteSuggestion, text: " + text);
});
chrome.omnibox.setDefaultSuggestion({
    "description": "啥也不干，就是随便试试...."
})// 设置默认的搜索建议，会显示在搜索建议列表的第一行位置，content省略使用用户当前输入的text作为content

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url) {
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}

/*------------------------通讯--------------------*/
async function getBimMsg(msg) {
    console.log(msg, '尝试发送请求');
    let res = await axios.get('http://bi.camelwifi.cn/CW_API/PlatformAimsPay');
    console.log('请求结果', res);
}
let data=[];
//监听消息
chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
    if (req.type === 'background') {
        sendResponse('background收到了消息')
        if (req.msg === 'BI') getBimMsg('收到了content的消息');
        if(req.msg.data.length){
            callbackMsg('background给你回复信息');
            data=[...data,...req.msg.data];
            let map = new Map();
            data=data.filter(item=>!map.has(JSON.stringify(item)) && map.set(JSON.stringify(item),1))
            return
        }
        sendMessage();
    }
})
async function callbackMsg(msg){
    const tabId = await getCurrentTabId();
    chrome.tabs.sendMessage(tabId,msg,function (res) {
        console.log('background收到了回调:'+res)
    })
}
async function sendMessage() {
    //popup和background只有一个能回信息，其中一个回了，其他不会回
    const tabId = await getCurrentTabId()
    // 在背景页面发送消息，需要当前 tabID
    chrome.tabs.sendMessage(tabId, '我是background，我在发送消息', function (res) {
        console.log('background：', res)
    });
}

function getCurrentTabId() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            resolve(tabs.length ? tabs[0].id : null)
        });
    })
}
