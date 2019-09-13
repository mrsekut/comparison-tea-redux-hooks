import * as React from 'react';
import { createContext, useReducer, Dispatch } from 'react';
import reducer, {
  initialState,
  MainState,
  MainActions
} from './modules/module';

interface StoreWithAction {
  state: MainState;
  dispatch: Dispatch<MainActions>;
}

const Store = createContext<StoreWithAction>({
  state: initialState,
  dispatch: () => {}
});

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, Provider };
