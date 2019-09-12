import { Reducer } from 'redux';

// Initial State
// =============================

export type Todos = Array<{
  id: number;
  todo: string;
}>;

export interface MainState {
  readonly formValue: string;
  readonly todos: Todos;
}

const initialState: MainState = { formValue: '', todos: [] };

// Reducer
// =============================

export type MainActions = any; // FIXME: type

const reducer: Reducer<MainState, MainActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, formValue: action.payload.formValue };
    case 'ADD':
      return {
        ...state,
        formValue: '',
        todos: [
          ...state.todos,
          {
            id: action.payload.nextId,
            todo: state.formValue
          }
        ]
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      // const _: never = action;
      return state;
  }
};

export default reducer;
