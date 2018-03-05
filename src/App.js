import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './App.css';
import { connect } from 'react-redux';
import { Creators } from '../src/modules/reducers/formReducer';
import TabContent from './components/TabContent';
import { RaisedButton } from 'material-ui';

class App extends Component {
  renderTabs = () => {
    return this.props.attributes.map( (tab, index) => {
      return (
        <Tab key={index} label={tab.name}>
          <TabContent
            tabdata={tab}
            addAttributes={this.props.addAttributes}
            updateForm={this.props.updateForm}
            removeAttributes={this.props.removeAttributes}
            updateError={this.props.updateError}
            allTabs={this.props.attributes}
          />
        </Tab>
      );
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
  addAttributes: Creators.addAttributes,
  updateForm: Creators.updateForm,
  removeAttributes: Creators.removeAttributes,
  updateError: Creators.updateError,
})(App);
