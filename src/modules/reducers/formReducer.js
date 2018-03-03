import { createReducer, createActions } from 'reduxsauce';
import { merge } from 'lodash';
// Action Creators
const { Types, Creators } = createActions ({
  addAttributes: ['tabid','attributes'],
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
    }
  ],
  count: 0
};

export default createReducer( initialState, {
	[Types.ADD_ATTRIBUTES]: ( state = initialState, action ) => {
    let attributes = state.attributes.find(tab => tab.tabId === action.tabid);

    attributes.forms.push(action.attributes)
    let finalAttributes = merge( state.attributes, [attributes] )
    console.log(attributes, finalAttributes);

		return {
		  ...state,
      attributes: finalAttributes

		}
	},
});
