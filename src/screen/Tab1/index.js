import React, {useEffect,useState} from 'react'
import ListDiv from '../../components/UI/ListDiv'
import './index.scss'

function Tab1() {
    const [ctx, setCtx] = useState('我是Tab1,我要打10个');
    useEffect(() => {
        console.log(ctx);
        let timer=setTimeout(()=>setCtx('Tab1消失了'),5000)
        return () => clearTimeout(timer)
    }, [ctx])
    return <div className={'tab1'}>
        <h1>{ctx}</h1>
        <ListDiv number={10} />
    </div>
}

export default Tab1;
