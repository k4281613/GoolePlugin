
import './index.scss'

import React from "react";

function ListDiv(props) {
    const number=Number(props.number);
    let arr=[];
    for(let i=0;i<number;i++)arr.push(i);
    const listItem = arr.map(num=> <div key={num}>{num+1}</div>);
    return <section className={'listDiv'}>{listItem}</section>
}

export default ListDiv;
