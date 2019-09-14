import * as React from 'react';
import { useContext } from 'react';
import { Store } from './store';
import {
  addTodoAction,
  deleteTodoAction,
  handleChangeFormAction
} from './modules/module';

const useTodo = () => {
  const { state, dispatch } = useContext(Store);
  const addTodo = () => dispatch(addTodoAction());
  const deleteTodo = (id: number) => dispatch(deleteTodoAction(id));
  return [state.todos, addTodo, deleteTodo] as const;
};

const App: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(handleChangeFormAction(e.target.value));

  const [todos, addTodo, deleteTodo] = useTodo();

  return (
    <div>
      <input
        type="text"
        placeholder="todo"
        value={state.formValue}
        onChange={handleChange}
      />
      <button onClick={addTodo}>add</button>
      <div>
        <ul>
          {todos.map(t => (
            <li key={t.id} onClick={() => deleteTodo(t.id)}>
              {t.todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
