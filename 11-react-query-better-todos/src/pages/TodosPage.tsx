import { useMutation, useQuery } from '@tanstack/react-query';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import AddNewTodoForm from '../components/AddNewTodoForm';
import AutoDismissingAlert from '../components/AutoDismissingAlert';
import * as TodosAPI from '../services/TodosAPI';
import { Todo } from '../types/TodosAPI.types';

const TodosPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParams_deletedTodo = searchParams.get('deleted');
  const deletedTodo = Boolean(searchParams_deletedTodo);

  const {
    data: todos,
    isError,
    refetch: getTodos,
  } = useQuery(['todos'], TodosAPI.getTodos);

  const addTodoMutation = useMutation(TodosAPI.createTodo, {
    onSuccess: () => {
      getTodos(); // Fetch updated todos after adding a new one
    },
  });

  const handleAddTodo = (newTodo: Todo) => {
    addTodoMutation.mutate(newTodo);
  };

  return (
    <>
      <h1 className="mb-3">Todos</h1>

            <AddNewTodoForm onSubmit={handleAddTodo} isSubmitting={addTodoMutation.isLoading}/>


      {location.state?.message && (
        <Alert variant="success">{location.state.message}</Alert>
      )}

      {deletedTodo && (
        <AutoDismissingAlert variant="success" hideAfter={3}>
          Todo was successfully deleted
        </AutoDismissingAlert>
      )}

      {isError && (
        <Alert variant="danger">
          An error occurred while fetching todos.
        </Alert>
      )}

      {todos && todos.length > 0 && (
        <ListGroup className="todolist">
          {todos.map((todo) => (
            <ListGroup.Item
              action
              as={Link}
              key={todo.id}
              className={todo.completed ? 'done' : ''}
              to={`/todos/${todo.id}`}
            >
              { todo.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {todos && todos.length === 0 && (
        <p>Yayyy, you have 0 todos to do</p>
      )}
    </>
  );
};

export default TodosPage;
