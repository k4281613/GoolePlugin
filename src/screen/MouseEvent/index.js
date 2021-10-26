import React, {useEffect} from 'react'

import './index.scss'

function MouseEvent() {
    function drop(e) {
        e.preventDefault();
        if (e.currentTarget.children.length) return
        let data = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(data));
    }

    function drag(ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function reset() {
        let goods = document.querySelector('.goods');
        let first_box = document.querySelector('.firstbox');
        first_box.appendChild(goods);
        goods.style.left=0;
        goods.parentNode.style.width=80+'px';
        goods.parentNode.style.background='none';
    }

    function sleep(delay) {
        let start = Date.now();
        while (Date.now() - start < delay) {
            continue;
        }
    }

    async function simulateMouse() {
        let goods = document.querySelector('.goods');
        let goods_parent_width=80;
        goods.parentNode.style.background='#00B198';
        let i=0;
        let timer=setInterval(()=>{
            i+=5;
            goods_parent_width+=5;
            goods.style.left=i+'px';
            goods.parentNode.style.width=goods_parent_width+'px';
            if(i>800){
                clearInterval(timer)
                setTimeout(()=>{
                    goods.click();
                },100)
            }
        },10)
    }
    function f(e) {
        if(e.type==="pointermove")return;
        console.log(4444,e)
        alert('通过验证')
    }

    return <div className={'mousevent '}>
        <div className={'ctx'}>
            <h2 onClick={() => simulateMouse()}>模拟鼠标移入数据</h2>
            <div className={'display_flex'}>
                <div onDragOver={(event) => allowDrop(event)} onDrop={(event) => drop(event)}
                     className={'firstbox box'}>
                    <div className={'goods'} draggable={true} onClick={(e)=>f(e)} onDragStart={(event) => drag(event)} id={'goods'}/>
                </div>
                <div className={'box'} onDragOver={(event) => allowDrop(event)} onDrop={(event) => drop(event)}/>
                <div className={'reset'} onClick={() => {
                    reset()
                }}>重置
                </div>
            </div>

        </div>

    </div>
}

export default MouseEvent;
