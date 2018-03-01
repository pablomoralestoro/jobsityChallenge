import { createStore } from 'redux';
import rootReducers from '../modules';

export default () => {

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    return createStore(
      rootReducers, /* preloadedState, */
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return createStore(rootReducers);
}
