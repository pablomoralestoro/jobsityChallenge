import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Creators } from '../src/modules/reducers/formReducer';
import TabContent from './components/Tab';


class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = 
  //   this.incrementCounter = this.incrementCounter.bind(this);
  // }

  incrementCounter = () => {
    this.props.increment();
  }

  renderTabs = () => {
    return this.props.attributes.map(tab => {
      return <Tab label={tab.name}><TabContent key={tab.tabId} tabdata={tab} /></Tab>
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {JSON.stringify(this.props.state)}
        </p>
        <button onClick={this.incrementCounter}>INCREMENT</button>
        <Tabs> {this.renderTabs()} </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.formReducer,
    attributes: state.formReducer.attributes
  };
}

export default connect(mapStateToProps, {
  increment: Creators.increment,
})(App);
