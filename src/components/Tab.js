import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AttributeForm from './AttributeForm';
import { connect } from 'react-redux';
import { Creators } from '../modules/reducers/formReducer';

class Tab extends Component {

  addForm = () => {
    const {tabdata, addAttributes} = this.props;
    addAttributes(tabdata.tabId, {
      name: null,
      description: null,
    });
  }

  renderAttributes = () => {
    console.log(this.props.tabdata.forms);

    return this.props.tabdata.forms.map((form, index) => {
      return <AttributeForm key={index} formdata={form} />
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
        <div className="siyas">
          {this.renderAttributes()}
        </div>
        {JSON.stringify(this.props.tabdata, null, 2)}
      </div>
    );
  }
}

export default connect(null, {
  addAttributes: Creators.addAttributes,
})(Tab);
