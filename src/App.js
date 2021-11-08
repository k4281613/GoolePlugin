import './App.scss';
import {HashRouter, Route, Switch,useHistory} from 'react-router-dom'
import Tab1 from './screen/Tab1/index'
import Tab2 from './screen/Tab2/index'
import Chrome from './screen/Chrome/index'
import MouseEvent from './screen/MouseEvent/index'
import Boast from './screen/Boast/index'
import PluginHeader from './components/container/PluginHeader'
import React, {useEffect} from 'react'
function App() {
    let history=useHistory();
    useEffect(()=>{
        React.$showIcon();
    });
    return (
        <div className="App">
            <HashRouter history={history}>
                <PluginHeader />
                <Switch>
                    <Route component={Tab1} path="/tab1" />
                    <Route component={Tab2} path='/tab2'/>
                    <Route component={Chrome} path='/chrome'/>
                    <Route component={MouseEvent} path='/mousevent'exact/>
                    <Route component={Boast} path='/boast'exact/>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
