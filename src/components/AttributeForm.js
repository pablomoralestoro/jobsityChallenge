import React, { Component } from 'react';
import { Card, CardHeader, CardText,
  TextField, SelectField, MenuItem, RaisedButton, FloatingActionButton }
  from 'material-ui';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

class AttributeForm extends Component {

  render() {
    return (
      <Card>
        <CardHeader
          showExpandableButton={true}>

          <TextField
            hintText='Enter a name'
            floatingLabelText='Name:'
            floatingLabelFixed={true}
          />

          <TextField
            hintText='Enter a description for your new attribute'
            floatingLabelText='Description:'
            floatingLabelFixed={true}
          />

          <FloatingActionButton>
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
          /><br />

          <SelectField floatingLabelText='Device Resource Type' value={1} >
            <MenuItem value={1} primaryText='Default Value' />
          </SelectField>

          <SelectField floatingLabelText='Device Resource Type' value={1} >
            <MenuItem value={1} primaryText='Default Value' />
          </SelectField>
          <br />

          <TextField
            hintText='Enter value'
            floatingLabelText='Enumerations:'
            floatingLabelFixed={true}
          />

          <RaisedButton label="Primary" primary={true} />

        </CardText>
      </Card>
    );
  }

}

export default AttributeForm;
