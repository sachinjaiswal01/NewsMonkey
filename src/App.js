import './App.css';
import React from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

const App =()=> {
  const pagesize=9;
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Switch>
          {/* key should be different and whatever can be */}
          <Route exact path="/general"><News setProgress={setProgress}key="general" pagesize={pagesize} country="in" category="general"/></Route>
          <Route exact path='/business'><News setProgress={setProgress} key="business" pagesize={pagesize} country="in" category="business"/></Route>
          <Route exact path='/entertainment'><News setProgress={setProgress}key="ntertainment" pagesize={pagesize} country="in" category="entertainment"/></Route>
          <Route exact path="/health"><News setProgress={setProgress}key="healt" pagesize={pagesize} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress}key="scince" pagesize={pagesize} country="in" category="science"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress}key="technology" pagesize={pagesize} country="in" category="technology"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress}key="sports" pagesize={pagesize} country="in" category="sports"/></Route>
        </Switch>
        </Router>
      </div>
    )
}
export default App

