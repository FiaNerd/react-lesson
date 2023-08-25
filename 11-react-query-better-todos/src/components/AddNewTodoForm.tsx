import React, { useRef } from 'react';
import { Todo } from '../types/TodosAPI.types';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  onSubmit: (newTodo: Todo) => void;
  isSubmitting: boolean;
}

const AddNewTodoForm: React.FC<IProps> = ({ onSubmit, isSubmitting }) => {
  const newTodoTitleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTodoTitle = newTodoTitleRef.current?.value;

    if (newTodoTitle) {
      const newTodo: Todo = {
        title: newTodoTitle,
        completed: false,
      };

      onSubmit(newTodo); // Call the mutation function passed via props

      // Clear input field
      newTodoTitleRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          ref={newTodoTitleRef}
          type="text"
          className="form-control"
          placeholder="Todo title"
        />
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          Create
        </button>
      </div>
    </form>
  );
};

export default AddNewTodoForm;
