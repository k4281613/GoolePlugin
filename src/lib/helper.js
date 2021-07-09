export function add(value) {
    value = Number(value) < 10 ? '0' + value : value;
    return value
}

export function addPander() {
    let divs = document.getElementsByTagName('div');
    Object.keys(divs).forEach(async key => {
        const AppLogo = divs[key].getElementsByClassName('App-logo');
        if (AppLogo.length) {
            AppLogo[0].style.filter = `hue-rotate(${(Math.random() * 360).toFixed(0)}deg)`;
            return;
        }
        if (divs[key].children.length) return;
        divs[key].style.position = 'relative';
        let pander = document.createElement('img');
        pander.src = 'http://qvwp3pxkj.hn-bkt.clouddn.com/pander.gif';
        pander.alt = '熊猫烧香';
        pander.setAttribute('class', 'App-logo position_center');
        pander.style.filter = `hue-rotate(${(Math.random() * 360).toFixed(0)}deg)`;
        divs[key].innerHTML = '';
        divs[key].appendChild(pander);
    })
}

export function showIcon() {
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
        }


    })
}
