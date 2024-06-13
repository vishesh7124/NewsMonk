// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/news';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = ()=> {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

     
      return (
        <div>
        <Router>

          <NavBar/>
          <LoadingBar color='#f11946' progress={progress} />
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={3} country ="in" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={3} country ="in" category="business" />} > </Route>
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={3} country ="in" category="entertainment" /> }></Route>
            <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={3} country ="in" category="general" /> } ></Route>
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={3} country ="in" category="health" /> }></Route>
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={3} country ="in" category="science" /> }></Route>
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={3} country ="in" category="sports" />}> </Route>
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology  " pageSize={3} country ="in" category="technology" />}> </Route>

          </Routes>
        </Router>

      </div>
      
    )
}

export default App;

