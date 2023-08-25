import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import AddNewTodoForm from '../components/AddNewTodoForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as TodosAPI from '../services/TodosAPI';
import { Todo } from '../types/TodosAPI.types';

const CreateTodoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(TodosAPI.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      navigate('/todos');
    },
  });

  const handleAddTodo = (newTodo: Todo) => {
    addTodoMutation.mutate(newTodo);
  };

  return (
    <>
      <h1 className="mb-3">Create a new Todo</h1>


      <AddNewTodoForm onSubmit={handleAddTodo} isSubmitting={addTodoMutation.isLoading}/>

      {addTodoMutation.isLoading ? (
        <div>Adding todo...</div>
      ) : (
        <>
          {addTodoMutation.isError ? (
            <Alert variant="success" className="mt-3" style={{ display: addTodoMutation.isSuccess ? 'block' : 'none' }}>
            Todo created!
          </Alert>
          
          ) : null}

          {addTodoMutation.isSuccess ? (
            <Alert variant="success" className="mt-3">
              Todo created!
            </Alert>
          ) : null}
        </>
      )}
    </>
  );
};

export default CreateTodoPage;
