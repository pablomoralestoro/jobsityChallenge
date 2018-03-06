import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './App.css';
import { connect } from 'react-redux';
import { Creators } from '../src/modules/reducers/formReducer';
import TabContent from './components/TabContent';
import JSONPretty from 'react-json-pretty';
import {Dialog, FlatButton, RaisedButton} from 'material-ui';

class App extends Component {

  constructor() {
    super();
    this.state = {
      modal: {
        open: false,
      }
    }
  }

  handleOpen = () => {
    this.setState((prevState) => {
      return {modal: {open: prevState.modal.open = true}}
    });
  };

  handleClose = () => {
    this.setState((prevState) => {
      return {modal: {open: prevState.modal.open = false}}
    });
  };

  renderTabs = () => {
    
    return this.props.attributes.map( (tab, index) => {
      return (
        <Tab key={index} label={tab.name}>
          <TabContent
            tabdata={tab}
            addAttributes={this.props.addAttributes}
            updateForm={this.props.updateForm}
            removeAttributes={this.props.removeAttributes}
            allTabs={this.props.attributes}
            updateList={this.props.updateList}
            validForm={this.props.validForm}
          />
        </Tab>
      );
    })
  }

  confirmJson = () => {
    this.handleOpen();
  }

  clearPage = () => {
    window.location.reload();
  }

  renderModal = () => {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Form Results"
        modal={false}
        open={this.state.modal.open}
        onRequestClose={this.state.modal.handleClose}
        autoScrollBodyContent={true}
        actions={actions}
      >
        <JSONPretty id="json-pretty" json={this.props.attributes}></JSONPretty>
      </Dialog>
    )
  }

  render() {

    return (
      <div>
        <div>{this.renderModal()}</div>
        <form id="prettyForm">
          <div className="App">
            <Tabs> {this.renderTabs()} </Tabs>
          </div>
          <div>
            <RaisedButton label="Cancel" onClick={this.clearPage} secondary={true} />
            <RaisedButton label="Save" disabled={this.props.state.validForm} onClick={this.confirmJson} primary={true} />
          </div>
        </form>
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
  updateList: Creators.updateList,
  validForm: Creators.validForm
})(App);
