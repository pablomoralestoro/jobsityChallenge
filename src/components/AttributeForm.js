import React, { Component } from 'react';
import { Card, CardHeader, CardText,
  TextField, SelectField, MenuItem, FloatingActionButton }
  from 'material-ui';
import _ from 'lodash';

import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

class AttributeForm extends Component {

  removeForm = () => {
    const { tabId, removeForm, formdata } = this.props;
    removeForm(tabId, formdata.id);
  }

  validate = (tabid,id,field,value) => {
    let error;
    let name = [];
    const { tabId, formdata, updateError } = this.props;

    name = (name) => {
      const { allTabs } = this.props;
      var name = [];
      for (var i = 0; i < allTabs.length; i++) {
        var uniqueName = allTabs[i].forms.map((form, index) =>
          {name.push(form.name);});
      }
      let clones = name.filter(clones => clones === value && clones != '');
      if (clones.length > 1) {
        name = true;
      }
      return name;
    }

    switch (field) {
      case 'name':
        if (value==='') {
          error = 'This field is required';
          updateError(tabId,formdata.id,field,error);
        }
        if (name(name) === true) {
          error = 'This name is registered';
          updateError(tabId,formdata.id,field,error);
        }
        else {
          error = '';
          updateError(tabId,formdata.id,field,error);
        }
        break;
      default:

    }
  }

  render() {
    const { tabId, formdata, updateForm } = this.props;
    const { name, description, id, defaultValue, dataType, format, enumerations,
      rangemin, rangemax, unitOfMeasurement, precision, acurracy, error
    } = formdata;

    return (
      <Card>
        <CardHeader showExpandableButton={true}>

          <TextField
            hintText='Enter a name'
            floatingLabelText='Name:'
            floatingLabelFixed={true}
            value={name}
            errorText={error}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'name',value);
                this.validate(tabId,id,'name',value);
              }
            }
          />

          <TextField
            hintText='Enter a description for your new attribute'
            floatingLabelText='Description:'
            floatingLabelFixed={true}
            value={description}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'description',value)
              }
            } />

          <FloatingActionButton className="Header-item" onClick={this.removeForm} >
            <ContentDeleteSweep />
          </FloatingActionButton>

        </CardHeader>

        <CardText expandable={true}>

          <SelectField floatingLabelText='Device Resource Type' value={1} disabled={true}>
            <MenuItem value={1} primaryText='Default Value' />
          </SelectField>

          <TextField
            hintText='Enter a default Value'
            floatingLabelText='Default Value:'
            floatingLabelFixed={true}
            value={defaultValue}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'defaultValue',value)
              }
            } /><br />

          <SelectField
            floatingLabelText='Data Type:'
            value={dataType}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'dataType',value)
              }
            }>
            <MenuItem value={0} primaryText='STRING' />
            <MenuItem value={1} primaryText='OBJECT' />
          </SelectField>

          <SelectField
            floatingLabelText='Format:'
            value={format}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'format',value)
              }
            }>
            <MenuItem value={0} primaryText='NONE' />
            <MenuItem value={1} primaryText='NUMBER' />
            <MenuItem value={2} primaryText='BOOLEAN' />
            <MenuItem value={3} primaryText='DATE-TIME' />
            <MenuItem value={4} primaryText='CDATA' />
            <MenuItem value={5} primaryText='URI' />
          </SelectField>
          <br />

        </CardText>
      </Card>
    );
  }

}

export default AttributeForm;
