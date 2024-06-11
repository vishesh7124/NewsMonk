// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/news';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  c = 'john'
  apiKey = process.env.REACT_APP_NEWS_API
  state ={
    progress :50
  }
  
  setProgres=(progress)=>{
    this.setState({progress:progress})
    }
    
    render() {  
      return (
        <div>
        <Router>

          <NavBar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => this.setProgress(0)}
      />
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="general" pageSize={3} country ="in" />} />
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="business" pageSize={3} country ="in" category="business" />} > </Route>
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="entertainment" pageSize={3} country ="in" category="entertainment" /> }></Route>
            <Route exact path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="general" pageSize={3} country ="in" category="general" /> } ></Route>
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="health" pageSize={3} country ="in" category="health" /> }></Route>
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="science" pageSize={3} country ="in" category="science" /> }></Route>
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="sports" pageSize={3} country ="in" category="sports" />}> </Route>
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgres} key="technology  " pageSize={3} country ="in" category="technology" />}> </Route>

          </Routes>
        </Router>

      </div>
      
    )
  }
}

