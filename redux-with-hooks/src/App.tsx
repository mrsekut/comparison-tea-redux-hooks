import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addTodo, deleteTodo, handleChangeForm } from './modules/module';
import { ReduxState, ReduxAction } from './store';

type ContaienrProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = ({ reducer }: ReduxState) => ({
  ...reducer
});

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators({ addTodo, deleteTodo, handleChangeForm }, dispatch);

const App: React.FC<ContaienrProps> = ({ formValue, todos, ...props }) => (
  <div>
    <input
      type="text"
      placeholder="todo"
      value={formValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.handleChangeForm(e.target.value)
      }
    />
    <button onClick={props.addTodo}>add</button>
    <div>
      <ul>
        {todos.map(t => (
          <li key={t.id} onClick={() => props.deleteTodo(t.id)}>
            {t.todo}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
