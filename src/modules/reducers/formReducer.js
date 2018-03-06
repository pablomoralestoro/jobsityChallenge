import { createReducer, createActions } from 'reduxsauce';
import { clone } from 'lodash';
// Action Creators
const { Types, Creators } = createActions ({
  addAttributes: ['tabid','attributes'],
  updateForm: ['tabid','formid','prop','value'],
  removeAttributes: ['tabid','formid'],
  updateList: ['tabid','formid','list','enumeration'],
  validForm: ['state']
},{});

export { Types, Creators };

// Initial State
const initialState={
  attributes: [
    { tabId: 1,
      name: "Attribute 1",
      forms: [],
    },
    { tabId: 2,
      name: "Attribute 2",
      forms: []
    },
    { tabId: 3,
      name: "Attribute 3",
      forms: []
    },
    { tabId: 4,
      name: "Attribute 4",
      forms: []
    },

  ],
  validForm: true
};

export default createReducer( initialState, {
	[Types.ADD_ATTRIBUTES]: ( state = initialState, action ) => {
    let newstate = clone(state.attributes)
    let attributes = newstate.find(tab => tab.tabId === action.tabid);
    attributes.forms.push(action.attributes);

		return {
		  ...state,
      attributes: newstate
		}
	},
  [Types.UPDATE_FORM]: ( state = initialState, action ) => {
    let newstate = [...state.attributes];
    let attributes = newstate.find(tab => tab.tabId === action.tabid);
    let form = attributes.forms.find(form => form.id === action.formid);
    form[action.prop] = action.value;

		return {
		  ...state,
      attributes: newstate,
		}
	},
  [Types.REMOVE_ATTRIBUTES]: ( state = initialState, action ) => {
    let newstate = clone(state.attributes)
    let attributes = newstate.find(tab => tab.tabId === action.tabid);
    let form = attributes.forms.findIndex(form => form.id === action.formid);
    attributes.forms.splice(form,1);

		return {
		  ...state,
      attributes: newstate
		}
	},
  [Types.UPDATE_LIST]: ( state = initialState, action ) => {
    let newstate = [...state.attributes];
    let attributes = newstate.find(tab => tab.tabId === action.tabid);
    let form = attributes.forms.find(form => form.id === action.formid);
    form.enumList.push(action.enumeration);
    form.enumerations = '';

		return {
		  ...state,
      attributes: newstate,
		}
	},
  [Types.VALID_FORM]: ( state = initialState, action ) => {
    let newstate = clone(state);
    let validated = newstate.validForm = action.state;

		return {
		  ...state,
      validForm: validated
		}
	},
});
