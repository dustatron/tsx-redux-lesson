import { combineReducers, createStore } from 'redux';
import recorderReducer from './recorder';
import userEventsReducer from './user-events';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

// Exports root state type for use is other components
// Infers state from 'ReturnType'
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
