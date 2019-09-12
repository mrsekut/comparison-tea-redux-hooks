import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, handleChangeForm } from './modules/module';
import { ReduxState } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch(); // storeに紐付いたdispatchを取得
  const formValue = useSelector(({ reducer }: ReduxState) => reducer.formValue);
  const todos = useSelector(({ reducer }: ReduxState) => reducer.todos);

  return (
    <div>
      <input
        type="text"
        placeholder="todo"
        value={formValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(handleChangeForm(e.target.value))
        }
      />
      <button onClick={() => dispatch(addTodo())}>add</button>
      <div>
        <ul>
          {todos.map(t => (
            <li key={t.id} onClick={() => dispatch(deleteTodo(t.id))}>
              {t.todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
