import * as React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from './store';
import useActions from './modules/useActions';

let nextId = 0;
const useTodo = () => {
  const todos = useSelector(({ reducer }: ReduxState) => reducer.todos);
  const addTodo = useActions(() => ({
    type: 'ADD',
    payload: {
      nextId: nextId++
    }
  }));
  const deleteTodo = useActions((id: number) => ({
    type: 'DELETE',
    payload: { id }
  }));

  return [todos, addTodo, deleteTodo] as const;
};

const useInput = () => {
  const formValue = useSelector(({ reducer }: ReduxState) => reducer.formValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => ({
    type: 'INPUT',
    payload: { formValue: e.target.value }
  });
  const setInput = useActions(handleChange);

  return [formValue, setInput] as const;
};

const App: React.FC = () => {
  const [formValue, setInput] = useInput();
  const [todos, addTodo, deleteTodo] = useTodo();

  return (
    <div>
      <input
        type="text"
        placeholder="todo"
        value={formValue}
        onChange={setInput}
      />
      <button onClick={addTodo}>add</button>
      <div>
        <ul>
          {todos.map((t: any) => (
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
