import React, { Component } from 'react';
import { Card, CardHeader, CardText, List, ListItem,
  TextField, SelectField, MenuItem, FloatingActionButton, RaisedButton }
  from 'material-ui';
import { ActionInfo, ContentDeleteSweep } from 'material-ui/svg-icons/';
import _ from 'lodash';

class AttributeForm extends Component {

  constructor() {

    super();
    this.state = {
      errors: {
        name: '',
        enumerations: '',
        rangemin: '',
        rangemax: '',
        unitOfMeasurement: '',
        precision: '',
        acurracy: ''
      },
      dataType: false,
    };
  }

  componentDidMount() {

    this.updateErrors('name','This field is required');
  }

  removeForm = () => {

    const { tabId, removeForm, formdata } = this.props;
    removeForm(tabId, formdata.id);
  }

  updateErrors = (field, error) => {

    var newErrors = _.extend({}, this.state.errors);
    newErrors[field] = error;
    this.setState({ errors: newErrors });
    this.validateSave(newErrors);

  }

  dataType = (value) => {

    var newState = _.extend({}, this.state);
    const { updateForm, tabId, formdata } = this.props;
    const { id } = formdata;
    let fields = ['enumerations', 'enumList', 'rangemin', 'rangemin', 'rangemax',
    'unitOfMeasurement', 'precision', 'acurracy'];

    switch (value) {

      case 1:
        newState.dataType = true;
        fields.map((field) => {
          return updateForm(tabId, id, field, null);
        });
        this.setState(newState);
        break;


      default:
        newState.dataType = false;
        fields.map((field) => {
          if (field === 'enumList') {
            return updateForm(tabId, id, field, []);
          }
          else {
            return updateForm(tabId, id, field, '');
          }
        });
        this.setState(newState);
    }
  }

  formatType = (format) => {
    let fields = ['rangemin', 'rangemin', 'rangemax',
    'unitOfMeasurement', 'precision', 'acurracy'];
    let fields1 = ['enumerations', 'enumList'];
    let fields2 = fields.concat(fields1);
    const { formdata, updateForm, tabId } = this.props;
    const { id } = formdata;

    if (format === 0) {
      fields.map((field) => {
        return updateForm(tabId, id, field, null);
      });
      fields1.map((field) => {
        if (field === 'enumList') {
          return updateForm(tabId, id, field, []);
        }
        else {
          return updateForm(tabId, id, field, '');
        }
      });
    }
    else if (format === 1) {
      fields1.map((field) => {
        return updateForm(tabId, id, field, null);
      });
      fields.map((field) => {
        return updateForm(tabId, id, field, '');
      });
    }
    else {
      fields2.map((field) => {
        return updateForm(tabId, id, field, null);
      });
    }
  }

  validate = (tabid,id,field,value) => {

    let error;
    let name = [];
    var valid = !/^\s*$/.test(value) && !isNaN(value);
    const { rangemax } = this.props.formdata;
    const { rangemin } = this.props.formdata;
    let minrange = parseFloat(rangemin);
    let valueFloat = parseFloat(value);
    let maxrange = parseFloat(rangemax);

    name = () => {

      const { allTabs } = this.props;
      var name = [];
      allTabs.map((tab)=> {
        return tab.forms.map((form) => {
          return name.push(form.name);
        })
      })

      let clones = name.filter(clones => clones === value && clones !== '');
      if (clones.length > 1) {
        name = true;
      }
      return name;
    }

    switch (field) {

      case 'name':

        if (value==='') {
          error = 'This field is required';
          this.updateErrors(field,error);
        }
        else if (name() === true) {
          error = 'This name is registered';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'enumerations':

        if (value==='') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'rangemin':

        if (value === '') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else if (!valid) {
          error = 'The input must be a number';
          this.updateErrors(field,error);
        }
        else if (value >= rangemax && rangemax !== '') {
          error = 'The input must be lower than Range Max';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'rangemax':

        if (value === '') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else if (!valid) {
          error = 'The input must be a number';
          this.updateErrors(field,error);
        }
        else if (value <= rangemin) {
          error = 'The input must be higher than Range Min';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'unitOfMeasurement':

        if (value === '') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else if (valid) {
          error = 'The input must be a string';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'precision':

        if (value === '') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else if (!valid) {
          error = 'The input must be a number';
          this.updateErrors(field,error);
        }
        else if (((maxrange - minrange) % valueFloat) !== 0) {
          error = 'Value not allowed';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      case 'acurracy':

        if (value === '') {
          error = 'The field is empty';
          this.updateErrors(field,error);
        }
        else if (!valid) {
          error = 'The input must be a number';
          this.updateErrors(field,error);
        }
        else if (((maxrange - minrange) % valueFloat) !== 0) {
          error = 'Value not allowed';
          this.updateErrors(field,error);
        }
        else {
          error = '';
          this.updateErrors(field,error);
        }
        break;

      default:

    }
  }

  renderFields = () => {

    const { tabId, updateForm } = this.props;
    const { errors, dataType } = this.state;
    const { format, enumerations, id, rangemin, rangemax,
      unitOfMeasurement, precision, acurracy
    } = this.props.formdata;

    switch (dataType) {

      case true:
        break;

      default:

        switch (format) {

          case 0:

            return (
              <div>
                <TextField
                  className='input'
                  hintText='Enter value'
                  floatingLabelText='Enumerations:'
                  floatingLabelFixed={true}
                  value={enumerations}
                  errorText={errors.enumerations}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'enumerations',value);
                    }
                  }
                />
                <RaisedButton
                  className="list-Button"
                  label="Add"
                  primary={true}
                  onClick={this.addList}
                />
                <List>
                  {this.renderList()}
                </List>
              </div>
            );

          case 1:

            return (
              <div>
                <TextField
                  className='input'
                  hintText='Range Min'
                  floatingLabelText='Range:'
                  floatingLabelFixed={true}
                  value={rangemin}
                  errorText={errors.rangemin}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'rangemin', value);
                      this.validate(tabId, id, 'rangemin', value);
                    }
                  }
                />
                <TextField
                  className='input range-Max'
                  hintText='Range Max'
                  value={rangemax}
                  errorText={errors.rangemax}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'rangemax',value);
                      this.validate(tabId, id, 'rangemax', value);
                    }
                  }
                /><br />
                <TextField
                  className='input'
                  hintText='UoM (eg. mm)'
                  floatingLabelText='Unit of Measurement:'
                  floatingLabelFixed={true}
                  value={unitOfMeasurement}
                  errorText={errors.unitOfMeasurement}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'unitOfMeasurement',value);
                      this.validate(tabId, id, 'unitOfMeasurement', value);
                    }
                  }
                />
                <TextField
                  className='input'
                  hintText='Precision (eg. 0.5)'
                  floatingLabelText='Precision:'
                  floatingLabelFixed={true}
                  value={precision}
                  errorText={errors.precision}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'precision',value);
                      this.validate(tabId, id, 'precision', value);
                    }
                  }
                />
                <TextField
                  className='input'
                  hintText='Acurracy (eg. 0.5)'
                  floatingLabelText='Acurracy:'
                  floatingLabelFixed={true}
                  value={acurracy}
                  errorText={errors.acurracy}
                  onChange={
                    (event, value) => {
                      updateForm(tabId,id,'acurracy',value);
                      this.validate(tabId, id, 'acurracy', value);
                    }
                  }
                />
              </div>
            );
          default:
        }
    }
  }

  addList = () => {

    const { tabId, updateList, formdata } = this.props;
    const { id, enumerations, enumList } = formdata;
    this.validate(tabId, id, 'enumerations', enumerations);
    if (enumerations!=='') {
      updateList(tabId, id, enumList, enumerations);
    }
  }

  renderList = () => {

    return this.props.formdata.enumList.map((list,index) => {
      return (
        <ListItem
          className='list-Element'
          key={index}
          primaryText={list}
          rightIcon={<ActionInfo />}
        />
      )
    })
  }

  validateSave = (errors) => {

    let validator = false;
    for (var key in errors) {
      if (errors[key] !==  '' ) {
        validator = true;
      }
    }
    let formid = this.props.formdata.id.replace( /^\D+/g, '');
    this.props.validForm(validator,formid);

  }

  render() {

    const { tabId, formdata, updateForm } = this.props;
    const { errors } = this.state;
    const { name, description, id, defaultValue, dataType, format } = formdata;

    return (
      <Card className='attribute-Card'>
        <CardHeader className='card-Header' showExpandableButton={true}>

          <FloatingActionButton className="delete-Button" onClick={this.removeForm} >
            <ContentDeleteSweep />
          </FloatingActionButton>

          <TextField
            className='input name'
            hintText='Enter a name'
            floatingLabelText='Name:'
            floatingLabelFixed={true}
            value={name}
            errorText={errors.name}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'name',value);
                this.validate(tabId,id,'name',value);
              }
            }
          />

          <TextField
            className='input description'
            hintText='Enter a description for your new attribute'
            floatingLabelText='Description:'
            floatingLabelFixed={true}
            value={description}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'description',value);
              }
            }
          />

        </CardHeader>

        <CardText className='expanded-Card' expandable={true}>

          <SelectField floatingLabelText='Device Resource Type' className='input' value={1} disabled={true}>
            <MenuItem value={1} primaryText='Default Value' />
          </SelectField>

          <TextField
            className='input default-Value'
            hintText='Enter a default Value'
            floatingLabelText='Default Value:'
            floatingLabelFixed={true}
            value={defaultValue}
            disabled={this.state.dataType}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'defaultValue',value);
              }
            } /><br />

          <SelectField
            className='input'
            floatingLabelText='Data Type:'
            value={dataType}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'dataType',value);
                this.dataType(value);
              }
            } >
            <MenuItem value={0} primaryText='STRING' />
            <MenuItem value={1} primaryText='OBJECT' />
          </SelectField>

          <SelectField
            className='input'
            floatingLabelText='Format:'
            value={format}
            disabled={this.state.dataType}
            onChange={
              (event, value) => {
                updateForm(tabId,id,'format',value);
                this.formatType(value);
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

          {this.renderFields()}

        </CardText>
      </Card>
    );
  }

}

export default AttributeForm;
