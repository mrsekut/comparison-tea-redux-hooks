import { createStore, combineReducers, Action } from 'redux';
import reducer, { MainState, MainActions } from './modules/module';

const configureStore = () =>
  createStore(
    combineReducers({
      reducer
    })
  );

export default configureStore;

export type ReduxState = {
  reducer: MainState;
};

export type ReduxAction = MainActions | Action;
