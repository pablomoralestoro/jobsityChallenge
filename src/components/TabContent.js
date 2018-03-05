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
      error: '',
      name: '',
      description: '',
      defaultValue: 0,
      dataType: 0,
      format: 0,
      enumerations: '',
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
          updateError={this.props.updateError}
          allTabs={this.props.allTabs}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <p className="Header-item">This form is made as a challenge delivered to Jobsity by Pablo Morales
            and should not be cloned for the same purposes</p>
          <FloatingActionButton className="Header-item" onClick={this.addForm}>
            <ContentAdd />
          </FloatingActionButton>
        </header>
        <div className="attributes">
          {this.renderAttributes()}
        </div>
        <JSONPretty id="json-pretty" json={this.props.tabdata}></JSONPretty>
      </div>
    );
  }
}

export default TabContent;
