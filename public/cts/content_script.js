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
            console.log(window.getSelection().toString())

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
            console.log(window.getSelection().toString(),icon)
        }
    })
}

document.addEventListener('DOMContentLoaded', function()
{
    console.log('我注入成功了！');
    showIcon();
});