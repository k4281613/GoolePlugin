document.addEventListener('DOMContentLoaded', function () {
    console.log('我注入成功了！');
    showIcon();
});

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

function showIcon() {
    document.addEventListener('mouseup', (e) => {
        let eClass = e.target.getAttribute('class');
        if (eClass === 'App-icon') {
            return
        }
        //生成悬浮icon
        if (window.getSelection().toString().length > 1) {
            const isExistIcon = document.getElementsByClassName('App-icon');
            if (isExistIcon.length) document.body.removeChild(isExistIcon[0]);
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
                e.target.parentNode.removeChild(e.target);

            })
            document.body.appendChild(icon);
        } else {
            const isExistIcon = document.getElementsByClassName('App-icon');
            if (isExistIcon.length) document.body.removeChild(isExistIcon[0]);
        }
    })
}

function setZeroOpacity(dom) {
    dom.each((i, e) => {
        $(e).css('opacity', 0)
    })
}

function updateYotube() {
    if (~window.location.href.indexOf('youtube')) {
        document.title = 'JSdom';
        setZeroOpacity($('video'))
        setZeroOpacity($('img'))
        setZeroOpacity($('.ytd-topbar-logo-renderer'))
    }
}

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

/*-------------------------通讯---------------------*/
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
    if (request.type === 'tmall') {
        sendResponse('开始获取数据');
        getTmall();
        return
    }
    sendResponse('content_script收到了你的消息！');
});

/*天猫例子*/
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
        let btn=document.querySelector('.ui-page-next');
        setTimeout(()=> {
            if ($('.ui-page-cur').text() !== '10' && btn) {
                $.cookie('downTmall', true);
                let timer = setInterval(() => {
                    let html = document.querySelector('html');
                    if (html.scrollTop < html.scrollHeight-2000) {
                        html.scrollTop = html.scrollTop + 10;
                        console.log(html.scrollTop,html.scrollHeight)
                    } else {
                        clearInterval(timer)
                        let time=Math.random()*1000;
                        setTimeout(()=>{btn.click();},time)
                    }
                }, 10)
            } else $.cookie('downTmall', false);
        })
    }
}

window.onload = () => {
    updateYotube();
    addBaiduButton();
    let cookie = $.cookie('downTmall');
    console.log(cookie)
    if (cookie === 'true') getTmall()
}
