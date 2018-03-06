import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AttributeForm from './AttributeForm';
import { uniqueId } from 'lodash';
import JSONPretty from 'react-json-pretty';

class TabContent extends Component {

  addForm = () => {
    const {tabdata, addAttributes} = this.props;

    addAttributes(tabdata.tabId, {
      id: uniqueId('form'),
      name: '',
      description: '',
      defaultValue: '',
      dataType: 0,
      format: 0,
      enumerations: '',
      enumList: [],
      rangemin: null,
      rangemax: null,
      unitOfMeasurement: null,
      precision: null,
      acurracy: null,
    });
  }

  renderAttributes = () => {
    return this.props.tabdata.forms.map((form) => {
      return (
        <AttributeForm
          key={form.id}
          formdata={form}
          tabId={this.props.tabdata.tabId}
          updateForm={this.props.updateForm}
          removeForm={this.props.removeAttributes}
          allTabs={this.props.allTabs}
          updateList={this.props.updateList}
          validForm={this.props.validForm}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <p className="Header-text">This form is made as a challenge delivered to Jobsity by Pablo Morales
            and should not be cloned for the same purposes</p>
          <FloatingActionButton className="Add-button" onClick={this.addForm}>
            <ContentAdd />
          </FloatingActionButton>
        </header>
        <div className="attributes">
          {this.renderAttributes()}
        </div>
        <h2>Tab {this.props.tabdata.tabId} Info:</h2>
        <JSONPretty id="json-pretty" json={this.props.tabdata}></JSONPretty>
      </div>
    );
  }
}

export default TabContent;
