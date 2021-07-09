import React, {useEffect,useState} from 'react'
import ListDiv from "../../components/UI/ListDiv";
import './index.scss'

function Tab2() {
    const [ctx, setCtx] = useState('我是Tab2,我要打100个');
    useEffect(() => {
        console.log(ctx);
        let timer=setTimeout(()=>setCtx('Tab2消失了'),5000)
        return () => clearTimeout(timer)
    }, [ctx])

    return <div className={'tab2'}>
        <h1 onClick={()=>React.$addPander()}>{ctx}</h1>
        <ListDiv number={100} />
    </div>
}

export default Tab2;
