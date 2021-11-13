document.addEventListener('DOMContentLoaded', function () {
    console.log('我注入成功了！',$(this));
    showIcon();
});

/******************************注入熊猫***************************/
//添加熊猫icon
function addPander() {
    let divs = $('img');
    Object.keys(divs).forEach(async key => {
        // divs[key].style.position = 'relative';
        divs[key].src = 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/baike/g=0;w=268/sign=eb0331827e3e6709ae0040f44cfaad0b/7acb0a46f21fbe0927e60eb16a600c338644addf.jpg';
        divs[key].alt = '熊猫烧香';
        $(divs[key]).addClass("pander");
        $(divs[key]).addClass("position_center");
        $(divs[key]).css("filter", `hue-rotate(${(Math.random() * 360).toFixed(0)}deg)`);
    })
}

//添加熊猫炸弹icon
function addPanderBomb(e) {
    let icon = document.createElement('img');
    icon.src = 'https://wimg.588ku.com/gif620/20/07/06/16181476c32d1262a0d77a16ba9e4357.gif';
    icon.alt = '熊猫烧香';
    icon.setAttribute('class', 'App-icon');
    icon.setAttribute('id', 'App-icon');
    icon.style.left = e.clientX + 30 + 'px';
    icon.style.top = e.clientY - 10 + 'px';
    //icon绑定事件
    icon.addEventListener('click', (e) => {
        addPander();
        removeIcon();
    })
    document.body.appendChild(icon);
}

//添加小黄人炸弹icon
function addYellowishBomb(e) {
    let icon2 = document.createElement('div');
    icon2.innerHTML = `<div class="topRight"></div>
    <div class="bottomRight"></div>`;
    icon2.alt = '小黄豆';
    icon2.setAttribute('class', 'App-icon');
    icon2.setAttribute('id', 'App-icon2');
    icon2.style.left = e.clientX + 70 + 'px';
    icon2.style.top = e.clientY - 10 + 'px';
    //icon绑定事件
    icon2.addEventListener('click', (e) => {
        xiaohuangdou();
        removeIcon();
    })
    document.body.appendChild(icon2);
}

function showIcon() {
    document.addEventListener('mouseup', (e) => {
        let eClass = e.target.getAttribute('class');
        if (eClass === 'App-icon' || eClass === 'topRight' || eClass === 'bottomRight' || eClass === 'topLeft' || eClass === 'bottomLeft') {
            return
        }
        //生成悬浮icon
        if (window.getSelection().toString().length > 1) {
            removeIcon();//删除上一次的炸弹icon
            addPanderBomb(e);//添加熊猫炸弹
            addYellowishBomb(e);//添加小黄人炸弹
        } else {
            removeIcon();
        }
    })
}

function removeIcon() {
    const isExistIcon = document.getElementsByClassName('App-icon');
    if (isExistIcon.length) {
        for (var i = 0, j = isExistIcon.length; i < j; j--) {
            document.body.removeChild(isExistIcon[i]);
        }
    }
}

/******************************贪吃的元素***************************/

let eatTingBool = true,node = null,_nodes = [],time=100;

let ydcnt,fx,rw;//正常移动下的左右转向判断；自由移动的方向；1是正常移动再自由移动，0是自由移动
function xiaohuangdou() {
    let bodys = $('body');
    dg(bodys);
    remove_nodes(time)
    createxiaohuangdoumodel(0, 0);
    ydcnt = 1;
    fx = 1;
    rw = 1;
    xiaohuangdouyd(1);
}


function dg(nodes) {
    let ns = nodes.children();
    for (let i = 0; i < ns.length; i++) {
        dg(ns.eq(i));
        _nodes.push(ns.eq(i));
    }
}

function addDelCarton(node) {
    $(node)[0].style.position = 'relative';
    let div = document.createElement('div');
    div.setAttribute('class', 'processDiv');
    div.style.animation=`mymove ${time/1000}s infinite`;
    $(node)[0].append(div);
}


function remove_nodes() {
    if (_nodes.length === 0) {
        console.log('删除完成')
        return
    }
    if (eatTingBool){
        node = _nodes.shift();
        addDelCarton(node,time)
    }else $('.processDiv').attr('class','');

    setTimeout(() => {
        console.log(node)
        if (eatTingBool)node.remove();
        remove_nodes(time)
    }, time)
}

function createxiaohuangdoumodel(x, y) {
    /**************** 注入贪吃人***************/
    let icon = document.createElement('div');
    icon.innerHTML = `<div class="topRight"></div>
    <div class="bottomRight"></div>`;
    icon.alt = '小黄豆';
    icon.setAttribute('class', 'App-xiaohuangdou');
    icon.setAttribute('id', 'xiaohuangdou');
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';
    document.body.appendChild(icon);
}

function xiaohuangdouyd(time) {
    /**************** 移动贪吃人***************/
    if (eatTingBool) {
        let winwidth = $(window).width();
        let winheight = $(window).height();
        let icon = document.getElementById("xiaohuangdou");
        if (rw) {
            //正常移动
            if (
                ((icon.offsetWidth + icon.offsetLeft) < winwidth) && fx == 1
                ||
                (icon.offsetLeft > 0) && fx == 0
            ) {
                if (fx) {
                    icon.style.left = (icon.offsetLeft + 1) + 'px';
                } else {

                    icon.style.left = (icon.offsetLeft - 1) + 'px';
                }
            } else {
                if ((icon.offsetHeight + icon.offsetTop) < winheight) {
                    if (icon.offsetTop < (icon.offsetHeight * ydcnt)) {
                        icon.style.top = (icon.offsetTop + 1) + 'px';
                    } else {
                        if (fx) {
                            fx = 0;
                            icon.innerHTML = `<div class="topLeft"></div>
    <div class="bottomLeft"></div>`;
                        } else {
                            fx = 1;
                            icon.innerHTML = `<div class="topRight"></div>
    <div class="bottomRight"></div>`;
                        }
                        ydcnt++;
                    }
                } else {
                    rw = 0;
                    console.log('我自由了');
                }
            }
        } else {
            //完成任务后自由移动
            let zx;//转向=0
            let positionQrequency = 100;
            //边界判断
            switch (fx) {
                case 1:
                    //上
                    if ((icon.offsetTop - 1) > 0) {
                        zx = Math.round(Math.random() * positionQrequency);
                    } else {
                        zx = 0;
                        console.log('碰到上边界了')
                    }
                    break;
                case 2:
                    //右
                    if ((icon.offsetWidth + icon.offsetLeft + 1) < winwidth) {
                        zx = Math.round(Math.random() * positionQrequency);
                    } else {
                        zx = 0;
                        console.log('碰到右边界了')
                    }
                    break;
                case 3:
                    //下
                    if ((icon.offsetHeight + icon.offsetTop + 1) < winheight) {
                        zx = Math.round(Math.random() * positionQrequency);
                    } else {
                        zx = 0;
                        console.log('碰到下边界了')
                    }
                    break;
                case 4:
                    //左
                    if ((icon.offsetLeft - 1) > 0) {
                        zx = Math.round(Math.random() * positionQrequency);
                    } else {
                        zx = 0;
                        console.log('碰到左边界了')
                    }
                    break;
            }

            //转向
            if (!zx) {
                let isyd = 1;
                let sjfx;
                do {
                    sjfx = Math.round(Math.random() * 3) + 1;
                    if (sjfx != fx) {
                        isyd = 0;
                    }
                }
                while (isyd);
                fx = sjfx;
            }

            //行驶
            let xiaohuangdou = document.getElementById('xiaohuangdou');
            let offset=5;
            let fns = [
                {
                    fn: () => {
                        xiaohuangdou.style.transform = "rotate(-90deg)";
                        icon.style.top = (icon.offsetTop - offset) + 'px';
                    }
                },
                {
                    fn: () => {
                        xiaohuangdou.style.transform = "rotate(0deg)";
                        icon.style.left = (icon.offsetLeft + offset) + 'px';
                    }
                },
                {
                    fn: () => {
                        xiaohuangdou.style.transform = "rotate(90deg)";
                        icon.style.top = (icon.offsetTop + offset) + 'px';
                    }
                },
                {
                    fn: () => {
                        xiaohuangdou.style.transform = "rotate(180deg)";
                        icon.style.left = (icon.offsetLeft - offset) + 'px';
                    }
                }
            ]
            fns[fx - 1].fn();
        }
    }
    setTimeout(() => {
        xiaohuangdouyd(time)
    }, time)
}

/*let _nodes2 = [];

function dg2(nodes, y_in_dex) {
    let ns = nodes.eq(y_in_dex).children();//获取节点下的子节点数组
    if (ns.length > 0) dg2(ns, 0);
    let n2 = nodes.eq(y_in_dex);//n2是操作的节点 nodes是节点数组
    y_in_dex++;
    if (nodes.length > y_in_dex) dg2(nodes, y_in_dex);
    _nodes2.push(n2);
}*/

/*-------------------------过滤youtobe---------------------*/
function setZeroOpacity(dom) {
    dom.each((i, e) => {
        $(e).css('opacity', 0)
    })
}

function updateYotube() {
    if (~window.location.href.indexOf('youtube')) {
        console.log(document.title)
        document.title = 'JSdom';
        console.log(document.title)
        setZeroOpacity($('video'))
        setZeroOpacity($('img'))
        setZeroOpacity($('.ytd-topbar-logo-renderer'))
    }
}

/******************************天猫爬取广告***************************/
function getTmall() {
    if (~window.location.href.indexOf('tmall')) {
        let dom = $('.grid-nosku').children('.product');
        let arr = [];
        dom.each((index, item) => {
            let children = $(item).children('.product-iWrap');
            let obj = {};
            obj.url = $(children).children('.productImg-wrap').children('a').attr('href');
            obj.pic_url = $(children).children('.productImg-wrap').children('a').children('img').attr('src');
            obj.price = $(children).children('.productPrice').children('em').attr('title');
            obj.title = $(children).children('.productTitle').children('a').attr('title');
            obj.shop = $(children).children('.productShop').children('a').text();
            obj.shop_url = $(children).children('.productShop').children('a').attr('href');
            obj.productStatus = $(children).children('.productStatus').text();
            arr.push(obj)
        })
        sentMsg({data: arr}, 'background');
        let btn = document.querySelector('.ui-page-next');
        setTimeout(() => {
            if ($('.ui-page-cur').text() !== '10' && btn) {
                $.cookie('downTmall', true);
                let timer = setInterval(() => {
                    let html = document.querySelector('html');
                    if (html.scrollTop < html.scrollHeight - 2000) {
                        html.scrollTop = html.scrollTop + 10;
                        console.log(html.scrollTop, html.scrollHeight)
                    } else {
                        clearInterval(timer)
                        let time = Math.random() * 1000;
                        setTimeout(() => {
                            btn.click();
                        }, time)
                    }
                }, 10)
            } else $.cookie('downTmall', false);
        })
    }
}

/******************************知乎过滤广告***************************/
function deleteAdvert() {
    $('.TopstoryItem--advertCard').remove()
}

function delVideo() {
    let TopstoryItem = $('.TopstoryItem');
    TopstoryItem.each((i, e) => {
        let video = $(e).find('.ZVideoItem');
        let VideoAnswerPlayer = $(e).find('.VideoAnswerPlayer');
        let ZVideoItemVideo = $(e).find('.ZVideoItem-player');
        let ZVideoItem = $(e).find('.ZVideoItem');
        if (video.length || VideoAnswerPlayer.length || ZVideoItem.length || ZVideoItemVideo.length) $(e).remove();
    })
}

function resetZhihu() {
    if (~window.location.href.indexOf('zhihu')) {
        let MutationObserver = window.MutationObserver;
        let ele = document.getElementById('TopstoryContent');
        $('.TopstoryItem--advertCard').remove()
        delVideo();
        //监听容器高度
        let watchFn = new MutationObserver((mutations) => {
            /*console.log(mutations,111)
            let height=ele.offsetHeight;
            console.log(height)*/
            $('.TopstoryItem--advertCard').remove()
            delVideo();
        })
        try {
            watchFn.observe(ele, {
                // childList: true, // 子节点的变动（新增、删除或者更改）
                attributes: true, // 属性的变动
                // characterData: true, // 节点内容或节点文本的变动
                subtree: true, // 是否将观察器应用于该节点的所有后代节点
                attributeFilter: ['class', 'style'], // 观察特定属性
                attributeOldValue: true, // 观察 attributes 变动时，是否需要记录变动前的属性值
                characterDataOldValue: true // 观察 characterData 变动，是否需要记录变动前的值
            })
        } catch (e) {
            console.warn(e)
        }

    }
}

/******************************BI摸鱼插件***************************/
function addBiFrame() {
    let body = document.querySelector('body');
    let iframe = document.createElement('iframe');
    iframe.src = 'http://www.wesane.com/Public/Games/326029/201605240441409210/html5/index.html?gameID=226106';
    $(iframe).attr('class', 'gloabPlay');
    $(iframe).attr('id', 'gloabPlay');
    $(iframe).css('display', 'none');
    body.append(iframe);
}

function addListenKeydown() {
    if (~window.location.href.indexOf('Ceo/liveshow.html')) {
        addBiFrame();
        $(document).keydown(function (event) {
            if (event.keyCode === 113) {
                let gloabPlay = $('#gloabPlay');
                let gloabPlayDisplay = gloabPlay.css('display');
                gloabPlay.css('display', gloabPlayDisplay === 'block' ? 'none' : 'block')
                console.log('你按下了f2', gloabPlayDisplay)
            }
        })
    }
}

/******************************B站隐藏video***************************/
function hidenBilili() {
    if (~window.location.href.indexOf('bilibili')) {
        document.title = 'JSdom';
        setInterval(() => {
            document.title = 'JSdom';
            console.log('更正标题');
        }, 60000)
        let videoPlayer = document.getElementById('video-player');
        let videoPlayerDisplay = $(videoPlayer).css('display');
        $(videoPlayer).css('display', videoPlayerDisplay !== 'none' ? 'none' : 'block');
    }
}

/******************************通讯******************************/
function addBaiduButton() {
    if (~window.location.href.indexOf('baidu')) {
        let btnGroup = [
            {value: '给popup发信息', msg: 'BI', type: 'popup', id: 'popup'},
            {value: '给background发信息', msg: 'BI', type: 'background', id: 'background'},
        ];
        btnGroup.forEach(item => {
            let button = `<span class="bg s_btn_wr"><input type="button" class="bg s_btn addBaiduBtn" value=${item.value} id=${item.id} /></span>`;
            $('#form').append(button);
            $('#' + item.id).on('click', () => sentMsg(item.msg, item.type));
        })
    }
}

function sentMsg(msg, type) {
    /*content_script 不在拥有chrome.extension权限，chrome.extension.getViews({type:'popup'}*/
    if (type === 'popup') console.log('温馨提示，请先打开popup页面');
    if (msg === 'BI') console.log('尝试发送BI请求');
    chrome.runtime.sendMessage({
        info: "我是 content.js， 我在发送消息",
        msg,
        type
    }, res => {
        console.log('我收到的回调：', res)
    })
}

//获取信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request/*, sender, sendResponse*/);
    let obj = {
        boom: () => {
            sendResponse('content_script:炸弹启动了');
            xiaohuangdou();
        },
        tmall: () => {
            sendResponse('开始获取数据');
            getTmall();
        },
        bilili: () => {
            sendResponse('操作BI视频display');
            hidenBilili();
        },
        pauseBoom: () => {
            sendResponse('暂停炸弹');
            eatTingBool=false;
        },
        continueBoom:()=>{
            sendResponse('继续炸弹');
            eatTingBool=true;
        },
        changeBoomVelocity:()=>{
            time=request.time;
            sendResponse('改变了炸弹的速率');
        }
    }
    if (obj.hasOwnProperty(request.type)) {
        obj[request.type]();
        return;
    }
    sendResponse('content_script收到了你的消息！');
});

window.onload = () => {
    updateYotube();
    addBaiduButton();
    resetZhihu();
    addListenKeydown();
    hidenBilili();
    let cookie = $.cookie('downTmall');
    if (cookie === 'true') getTmall()
}

