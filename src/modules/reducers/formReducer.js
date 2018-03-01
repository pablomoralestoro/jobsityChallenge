import { createReducer, createActions } from 'reduxsauce';

// Action Creators
const { Types, Creators } = createActions ({
  getAttributes: null,
  saveAttributes: ["attribute"],
  deleteAttributes: ["id"],
  increment: null,
},{});

export { Types, Creators };

// Initial State
const initialState={
  attributes: [
    { tabId: 1,
      name: "Attribute 1",
      forms: [{
        name: null,
        description: null,
      }]
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
	[Types.GET_ATTRIBUTES]: ( state = initialState, action ) => {
		return {
		  ...state
		}
	},
  [Types.SAVE_ATTRIBUTES]: ( state = initialState, action ) => {
    return {
      ...state
    }
  },
  [Types.DELETE_ATTRIBUTES]: ( state = initialState, action ) => {
    return {
      ...state
    }
  },
  [Types.INCREMENT]: ( state = initialState, action ) => {
    return {
      ...state,
      count: state.count+=1,
    }
  }
});
