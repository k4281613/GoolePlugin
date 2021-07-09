import './App.scss';
import {HashRouter, Route, Switch,useHistory} from 'react-router-dom'
import Tab1 from './screen/Tab1/index'
import Tab2 from './screen/Tab2/index'
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
                    <Route component={Tab1} path="/tab1" exact/>
                    <Route component={Tab2} path='/tab2'/>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
