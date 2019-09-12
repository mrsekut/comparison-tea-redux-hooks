import { Reducer } from 'redux';

// Initial State
// =============================

export interface MainState {
  readonly formValue: string;
  readonly todos: Array<{
    id: number;
    todo: string;
  }>;
}

const initialState: MainState = { formValue: '', todos: [] };

// Action Types
// =============================

enum ActionTypes {
  INPUT = 'INPUT',
  ADD = 'ADD',
  DELETE = 'DELETE'
}

// Reducer
// =============================

export type MainActions = ReturnType<
  typeof handleChangeForm | typeof addTodo | typeof deleteTodo
>;

const reducer: Reducer<MainState, MainActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.INPUT:
      return { ...state, formValue: action.payload.formValue };
    case ActionTypes.ADD:
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
    case ActionTypes.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      const _: never = action;
      return state;
  }
};

export default reducer;

// Action Creator
// =============================

export const handleChangeForm = (formValue: string) => ({
  type: ActionTypes.INPUT as ActionTypes.INPUT,
  payload: {
    formValue
  }
});

let nextId = 0;
export const addTodo = () => ({
  type: ActionTypes.ADD as ActionTypes.ADD,
  payload: {
    nextId: nextId++
  }
});

export const deleteTodo = (id: number) => ({
  type: ActionTypes.DELETE as ActionTypes.DELETE,
  payload: {
    id
  }
});
