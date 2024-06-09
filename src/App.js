// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/news';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default class App extends Component {
  c = 'john'
  render() {  
    return (
      <div>
        <NavBar/>
        <News pageSize={3} country ="in"  />

      </div>
      
    )
  }
}

