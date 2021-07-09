import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import './index.scss'

function PluginHeader(props) {
    let menus = [
        {name: 'Tab1', path: '/Tab1'},
        {name: 'Tab2', path: '/Tab2'},
    ]
    const [actived, setActived] = useState('/Tab1');

    useEffect(() => {
        props.history.replace(actived)
    }, [actived,props.history])

    let menusDom = menus.map(item => <li key={item.path} className={actived===item.path?'actived':''} onClick={()=>setActived(item.path)}>{item.name}</li>);
    return <>
        <nav>
            <ul className={'pluginHeader'}>
                {menusDom}
            </ul>
        </nav>
    </>
}

export default withRouter(PluginHeader);
