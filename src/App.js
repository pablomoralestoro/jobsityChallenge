import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Creators } from '../src/modules/reducers/formReducer';
import TabContent from './components/Tab';
import { RaisedButton } from 'material-ui';

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
      <div>
        <div className="App">
          <Tabs> {this.renderTabs()} </Tabs>
        </div>
        <div>
          <RaisedButton label="Secondary" secondary={true} />
          <RaisedButton label="Primary" primary={true} />
        </div>
        <div className="App-intro">
          {JSON.stringify(this.props.state)}
          <button onClick={this.incrementCounter}>INCREMENT</button>
        </div>
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
