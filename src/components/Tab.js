import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AttributeForm from './AttributeForm';
import { connect } from 'react-redux';
import { Creators } from '../modules/reducers/formReducer';

class Tab extends Component {

  addForm = () => {
    this.props.getAttributes();
  }

  renderAttributes = () => {
    const forms = [];

    for (var i = 0; i < this.props.attributes[0].forms[0].formsNumber; i += 1) {
      forms.push(<AttributeForm key={i} number={i} />);
    }
    return forms.map(attributes => {
      return attributes;
    })
  }

  render() {
    // for (var i = 0; i < this.state.attributeForms; i += 1) {
    //   forms.push(<AttributeForm key={i} number={i} />);
    // };
    //
    // addForm = () => {
    //   this.props.addAttributes();
    // }

    return (
      <div>
        <header className="App-header">
          <p className="Header-item">This form is made as a challenge delivered to Jobsity by Pablo Morales
            and should not be cloned for the same purposes</p>
          <FloatingActionButton className="Header-item" onClick={this.addForm}>
            <ContentAdd />
          </FloatingActionButton>
        </header>
        {this.renderAttributes()}
        {JSON.stringify(this.props.tabdata)}
        {JSON.stringify(this.props.state)}
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
  getAttributes: Creators.getAttributes,
})(Tab);
