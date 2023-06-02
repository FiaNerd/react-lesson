import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as TodosAPI from '../services/TodosAPI';

const EditTodoPage = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await TodosAPI.getTodo(todoId);
        setTitle(todo.title);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchTodo();
  }, [todoId]);

  const updateTodo = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await TodosAPI.updateTodo(todoId, { title });
      setSuccess(true);

      setTimeout(() => {
        navigate(`/todos/${todoId}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating todo:', error);
      setSuccess(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1 className="mb-3">Edit Todo</h1>

      <Form onSubmit={updateTodo}>
        <Form.Group controlId="formTodoTitle">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="secondary" className="ml-2" onClick={goBack}>
          Go Back
        </Button>
      </Form>

      {success === true && (
        <Alert variant="success" className="mt-3">
          Todo updated!😊
        </Alert>
      )}

      {success === false && (
        <Alert variant="warning" className="mt-3">
          Todo could not be updated 😔
        </Alert>
      )}
    </>
  );
};

export default EditTodoPage;
